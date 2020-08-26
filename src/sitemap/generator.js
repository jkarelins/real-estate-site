import { sitemapBuilder as buildSitemap, paramsApplier as applyParams } from 'react-router-sitemap'; // import applyParams for paths pattern
import routes from './routes';
import path from 'path'; // add path which will be needed for file write
import fs from 'fs'; // import file system object

const hostname = 'https://desolate-refuge-17574.herokuapp.com/';
const dest = path.resolve('./public', 'sitemap.xml');

// !!! This function should return array from backend with all advert & all cities we have adverts in!!!!
// const posts = getPostsForSitemap();

const config = {
	'/search/city/:cityName': [
    // !!!!!!!! Make 2x functions to request form backend all cities & all adverts !!! 
      { cityName: ['haarlem', 'amsterdam'] },
      // 
    ],
};
	
// Merge our route paths with config pattern    
const paths = applyParams(routes, config);

// Generate sitemap and return Sitemap instance
// paste new paths constant with hostname
const sitemap = buildSitemap(hostname, paths);

// write sitemap.xml file in /public folder
// Access the sitemap content by converting it with .toString() method
fs.writeFileSync(dest, sitemap.toString())