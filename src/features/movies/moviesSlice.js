import { createSlice } from "@reduxjs/toolkit";
import { TrendingTodayFetch } from "./MovieFetchThnk";
import { SearchTodayFetch } from "./MovieFetchThnk";

// فلتر مخصص لجميع الأفلام في الموقع ونتائج البحث
const isFamilyFriendlyMovie = (movie) => {
  if (!movie) return false;
  if (movie.adult === true || movie.adult === "true") return false;

  // جلب الكلمات المحظورة من ملف البيئة أو استخدام القيم الافتراضية
  // تم توسيع القائمة لتشمل كلمات توحي بمحتوى غير لائق أو عري غير صريح
  const defaultExplicitWords = "porn|porno|pornography|sex|fuck|nude|naked|erotic|erotik|erotica|lust|desire|seduction|poppea|süßen|porky|flesh|sensual|nympho|incest|whore|slut|rape|bdsm|fetish|dildo|vibrator|masturbate|orgasm|hardcore|softcore|hooker|brothel|escort|stripper|striptease|orgy|threesome|boobs|tits|playboy|penthouse|kama sutra|call girl|prostitute|emmanuelle|lolita|playmate|camgirl|stepmom|stepsister|sesso|rod steele|milf|dick|cock|pussy|vagina|anal|cum|sperm|blowjob|handjob|gangbang|horny|shag|nymphomaniac|incestuous";
  
  // دمج الكلمات الموجودة في ملف البيئة مع الكلمات الافتراضية لضمان عملهما معاً دائماً
  const envWords = import.meta.env.VITE_EXPLICIT_WORDS || "";
  const combinedWords = [defaultExplicitWords, envWords].filter(Boolean).join("|");
  
  const explicitRegex = new RegExp(`\\b(${combinedWords})\\b|18\\+|nsfw|xxx|xx|r-rated|x-rated`, 'i');
  
  // فحص العنوان الأصلي والعنوان المترجم
  if (movie.title && explicitRegex.test(movie.title)) return false;
  if (movie.original_title && explicitRegex.test(movie.original_title)) return false;
  
  // فحص أسماء المسلسلات (لأن البحث قد يُرجع مسلسلات تستخدم حقل name بدلاً من title)
  if (movie.name && explicitRegex.test(movie.name)) return false;
  if (movie.original_name && explicitRegex.test(movie.original_name)) return false;

  // فحص قصة الفيلم (Overview) لاكتشاف أي تلميحات داخل السياق
  if (movie.overview && explicitRegex.test(movie.overview)) return false;

  // تفعيل الفلتر الصارم: الأفلام والمسلسلات المغمورة جداً لا تحتوي على قصة أو قصتها عبارة عن حرف/نقطة.
  if (!movie.overview || movie.overview.trim().length < 5) return false;

  // فلتر إضافي قوي جداً: استبعاد الأفلام المغمورة التي تمتلك تقييمات قليلة جداً (أقل من 30 تقييم)
  if (movie.vote_count !== undefined && movie.vote_count < 30) return false;

  // استبعاد أي عمل لا يمتلك صورة غلاف (Poster)، لأن أغلب الأعمال العشوائية أو الإباحية المغمورة لا تمتلك غلافاً وتُشوه الموقع
  if (!movie.poster_path) return false;

  // جلب التصنيفات المحظورة من ملف البيئة أو استخدام القيم الافتراضية
  const envGenres = import.meta.env.VITE_MATURE_GENRES || "10749,27,80,53,18";
  const matureGenres = envGenres.split(',').map(Number);
  if (movie.genre_ids && movie.genre_ids.some(id => matureGenres.includes(id))) return false;

  return true;
};

const initialState = {
  trending: [],
  nowPlaying: [],
  discover: [],
  MovieSearch: [],
  MovieDetails: {
    data: [],
    post: [],
  },
  PaginationTrending: 0,
  PaginationNowPlaying: 0,
  PaginationDiscover: 0,
  PaginationMovieDetails: 0,
  PaginationMovieSearch: 0,
  // أضفنا هذه الحقول لحفظ رقم الصفحة الحالي لكل قسم
  currentPageTrending: 1,
  currentPageNowPlaying: 1,
  currentPageDiscover: 1,
  currentPageSearch: 1,
};

export const moviesSlice = createSlice({
  name: "Movie",
  initialState,
  reducers: {
    // أوامر لتحديث رقم الصفحة في Redux
    setPageTrending: (state, action) => { state.currentPageTrending = action.payload; },
    setPageNowPlaying: (state, action) => { state.currentPageNowPlaying = action.payload; },
    setPageDiscover: (state, action) => { state.currentPageDiscover = action.payload; },
    setPageSearch: (state, action) => { state.currentPageSearch = action.payload; },
  },
  extraReducers: (builder) => {
    builder.addCase(TrendingTodayFetch.fulfilled, (state, action) => {
      const payload = action.payload || {};
      const results = payload.results || [];
      
      const argMovie = action.meta.arg.Movie || "";

      if (argMovie.includes("trending/movie/day")) {
        state.trending = results.filter(isFamilyFriendlyMovie);
        state.PaginationTrending = Math.min(payload.total_pages || 0, 500);
      } else if (argMovie.includes("movie/now_playing")) {
        state.nowPlaying = results.filter(isFamilyFriendlyMovie);
        state.PaginationNowPlaying = Math.min(payload.total_pages || 0, 500);
      } else if (argMovie.includes("discover/movie")) {
        state.discover = results.filter(isFamilyFriendlyMovie);
        state.PaginationDiscover = Math.min(payload.total_pages || 0, 500);
      } else if (/movie\/\d+\/images/.test(argMovie)) {
        state.MovieDetails.post = payload;
        state.PaginationMovieDetails = Math.min(payload.total_pages || 0, 500);
      }
      else {
        // التحقق من الفيلم حتى لو تم الدخول إليه برابط مباشر (صفحة التفاصيل)
        state.MovieDetails.data = isFamilyFriendlyMovie(payload) ? payload : [];
        state.PaginationMovieDetails = Math.min(payload.total_pages || 0, 500);
      }
    });
    builder.addCase(SearchTodayFetch.fulfilled, (state, action) => {
      const payload = action.payload || {};
      state.MovieSearch = {
        ...payload,
        results: payload.results ? payload.results.filter(isFamilyFriendlyMovie) : []
      };
      state.PaginationMovieSearch = Math.min(payload.total_pages || 0, 500);
    });
  },
});

export const { setPageTrending, setPageNowPlaying, setPageDiscover, setPageSearch } = moviesSlice.actions;

export default moviesSlice.reducer;
