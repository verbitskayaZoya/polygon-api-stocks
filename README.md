I have a few questions: 

1. When I run locally in VS code, I get this error. I believe it is because I need to use node.js but I'd like to know more about it.  
[Running] node "/Users/zoyaverbitskaya/dev/polygon-api/render.js"
node:internal/modules/esm/resolve:255
    throw new ERR_MODULE_NOT_FOUND(
          ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/apiKey' imported from /Users/zoyaverbitskaya/dev/polygon-api/render.js
    at finalizeResolution (node:internal/modules/esm/resolve:255:11)
    at moduleResolve (node:internal/modules/esm/resolve:908:10)
    at defaultResolve (node:internal/modules/esm/resolve:1121:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:396:12)
    at ModuleLoader.resolve (node:internal/modules/esm/loader:365:25)
    at ModuleLoader.getModuleJob (node:internal/modules/esm/loader:240:38)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:85:39)
    at link (node:internal/modules/esm/module_job:84:36) {
  code: 'ERR_MODULE_NOT_FOUND',
  url: 'file:///apiKey'
}

2. Trying to fix the issue above before I used Vite, I created a package.json file and wrote there: "type": "module", but I don't feel confident with package.json files. I'm not sure how to handle them and I'd like to know how to work them. 

3. It was my first time using async/await, if there are any suggestions on how to improve my code, I'll be happpy to know them. 

I hope that's not too much to ask but if it is, the questions are put in order of importance :) 
Thanks a lot in advance! 