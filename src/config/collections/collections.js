import slugify from 'slugify';
import pkg from 'lodash';
import lodash from 'lodash';
const {replace, deburr} = pkg;

// 	--------------- Slugify -----------------
function strToSlug(str) {
  const options = {
    replacement: '-',
    remove: /[&,+()$~%.'":*?<>{}]/g,
    lower: true
  };
  return slugify(str, options);
}

// 	--------------- Get All Keys -----------------
function getAllKeyValues(collectionArray, key) {
  let allValues = collectionArray.map(item => {
    let values = item.data[key] ? item.data[key] : [];
    return values;
  });
  allValues = lodash.flattenDeep(allValues);
  allValues = allValues.map(item => item.toLowerCase());
  allValues = [...new Set(allValues)];
  allValues = allValues.sort(function (a, b) {
    return a.localeCompare(b, 'en', {
      sensitivity: 'base'
    });
  });
  return allValues;
}

// 	--------------- Hide Future Items -----------------
const hideFutureItems = post => {
  let now = new Date().getTime();
  if (now < post.date.getTime()) return false;
  return true;
};

/**
 * Helper function to sort Eleventy collection items by the first word of their title.
 * Handles missing titles and performs case-insensitive comparison.
 * @param {object} a - First collection item.
 * @param {object} b - Second collection item.
 * @returns {number} - Sort order indicator (-1, 0, 1).
 */
const sortByFirstWordOfTitle = (a, b) => {
  // Safely access titles, defaulting to an empty string
  const titleA = a.data?.title || '';
  const titleB = b.data?.title || '';

  // Extract the first word. Added extra '|| ""' in case the title was only whitespace.
  const firstWordA = (titleA.trim().split(/\s+/)[0] || '').toLowerCase();
  const firstWordB = (titleB.trim().split(/\s+/)[0] || '').toLowerCase();

  // Use localeCompare for proper alphabetical sorting
  return firstWordA.localeCompare(firstWordB);
};

export default {
  // 	------ Returns a collection of Posts -------------
  releasedPosts: collection => {
    return collection
      .getFilteredByGlob('./src/content/posts/**/*.md')
      .reverse()
      .filter(hideFutureItems);
  },

  // 	------ Returns a collection of vacancies -------
  vacancies: collection => {
    return collection.getAll()
      .filter(item => item.inputPath.includes('/content/vacancies/'))
      .sort(sortByFirstWordOfTitle); // Use the helper function
  },

  // 	------ Returns a collection of fabrication images -------
  fabImages: collection => {
    return collection.getFilteredByTags('fabImages');
  },

  // 	------ Returns a collection of machining images -------
  machineImages: collection => {
    return collection.getFilteredByTags('machineImages');
  }
};

