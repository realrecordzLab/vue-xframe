# vue-xframe
Vue directive to bypass X-Frame-Options deny/sameorigin response headers
[Original project](https://github.com/niutech/x-frame-bypass)

I was looking for a way to bypass CSP X-Frame-Options policy to embed some websites into an `<iframe>` in my vue app. 
Since the original library will not work in vue, I've decided to use part of the code to create this directive. Under the hood it will not do a lot.  
When the website url is passed to the directive, the desired website is fetched using a proxy that will handle CORS headers.
In this way the `is` attribute problem that was causing the problem with vue is bypassed and the same result of the original library is achived in vue.
 
**How to use**
Import the file into your vue app entry point to register a global directive or use it inside your components. 
```
import Vue from 'vue';
import App from './App';
import { xframe } from 'vue-xframe';

//Global directive registration
Vue.directive('xframe', xframe);

new Vue({
  el: '#app',
  render: h => (App)
});

//Local directive registration
directives: {
  xframe
}

```
Then on the iframe add
```
<!-- Do not set the src / set url using prop or data -->
  <iframe xframe="url" ></iframe>
```
