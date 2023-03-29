import AlgoliaSearch from "algoliasearch";
import review from "../../data/vocabularies.vi.json";

/**
 * Docs: https://www.algolia.com/doc/
 * Github Autocomplete: https://github.com/algolia/autocomplete
 * Search box modal => using https://docsearch.algolia.com/docs/who-can-apply
 * Sandboxes Autocomplete: https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/sandboxes/
 *
 */
export const ALGOLIA_SEARCH_CONFIG = {
  APP_ID: "BWFQYYPV6Q",
  SEARCH_ONLY_API_KEY: "610ba9f658d2bb0a50b6b04548c76ef4",
  APP_INDEX_NAME: "dev_EnglishApp",
  REVIEW_INDEX_NAME: "review",
  REVIEW_INDEX_NAME_QUERY_SUGGESTION: "review_query_suggestions",
  TURN_ON_SYNC_INDEX: false
};

export const searchClient = AlgoliaSearch(ALGOLIA_SEARCH_CONFIG.APP_ID, ALGOLIA_SEARCH_CONFIG.SEARCH_ONLY_API_KEY);

export const WordReviewIndexStore = searchClient.initIndex(ALGOLIA_SEARCH_CONFIG.REVIEW_INDEX_NAME);
export const WordReviewIndexStoreQuerySuggestion = searchClient.initIndex(ALGOLIA_SEARCH_CONFIG.REVIEW_INDEX_NAME_QUERY_SUGGESTION);

if (ALGOLIA_SEARCH_CONFIG.TURN_ON_SYNC_INDEX) {
  console.log("REVIEW data loading:", review)
  WordReviewIndexStore.replaceAllObjects(review, {autoGenerateObjectIDIfNotExist: true});
  WordReviewIndexStoreQuerySuggestion.replaceAllObjects(review, {autoGenerateObjectIDIfNotExist: true});
}
WordReviewIndexStore.setSettings({
  attributesToHighlight: [
    "word",
    "answers",
    "sentences",
    "phrases",
    "unitId"
  ],
  highlightPreTag: "<em class=\"search-highlight\">",
  highlightPostTag: "</em>"
});

WordReviewIndexStoreQuerySuggestion.setSettings({
  attributesToHighlight: [
    "word",
    "answers",
    "sentences",
    "phrases",
    "unitId"
  ],
  highlightPreTag: "<em class=\"search-highlight\">",
  highlightPostTag: "</em>"
});
