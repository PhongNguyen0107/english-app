import React, {useEffect, useMemo, useRef,} from 'react';
import type {SearchClient} from 'algoliasearch/lite';
import type {BaseItem} from '@algolia/autocomplete-core';
import type {AutocompleteOptions} from '@algolia/autocomplete-js';
import {autocomplete, getAlgoliaResults} from '@algolia/autocomplete-js';
import {createLocalStorageRecentSearchesPlugin} from '@algolia/autocomplete-plugin-recent-searches';
import '@algolia/autocomplete-theme-classic/dist/theme.css';
import {ALGOLIA_SEARCH_CONFIG} from "@/configuration/algolia-search-config";

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  searchClient: SearchClient;
  className?: string;
};


function AlgoliaAutocomplete(props: AutocompleteProps) {
  const {searchClient, className, ...autocompleteProps} = props;
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: 'instant-search',
      limit: 6,
    });

    return [recentSearches];
  }, []);

  useEffect(() => {
    if (!autocompleteContainer.current) return;
    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      plugins,
      // @ts-ignore
      getSources() {
        return [
          {
            sourceId: ALGOLIA_SEARCH_CONFIG.REVIEW_INDEX_NAME_QUERY_SUGGESTION,
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: ALGOLIA_SEARCH_CONFIG.REVIEW_INDEX_NAME_QUERY_SUGGESTION,
                    params: {
                      hitsPerPage: 4,
                      attributesToSnippet: ['word:100', 'answers:20'],
                      snippetEllipsisText: '…',
                    },
                  },
                ],
              });
            },
            templates: {
              item({item}) {
                return item.name;
              },
            },
          },
        ];
      },
    });

    return () => autocompleteInstance.destroy();
  }, [plugins]);

  return <div className={className} ref={autocompleteContainer}/>;
}

export default AlgoliaAutocomplete;
