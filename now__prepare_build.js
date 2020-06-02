#~/.nvm/current/bin/node

const fs = require('fs')
const path = require('path')

try {fs.accessSync('./build', fs.constants.F_OK | fs.constants.W_OK | fs.constants.X_OK)} catch(err) {console.error('now__prepare_build.js error! \'build\' directory either doesn\'t exist, is not writable or not executable by this process, exiting...'); process.exit(-2);}
if (fs.existsSync('./build/now.json')) {try {fs.accessSync('./build/now.json', fs.constants.W_OK)} catch(err) {console.error('now__prepare_build.js error! \'build/now.json\' exists, but is not writable by this process, exiting...'); process.exit(-3);}}

const constructNowJSON = (projName,domainAlias) => {
  if ((!projName)||(String(projName).length==0)) {projName = path.basename(path.resolve('.'))}
  domainAlias = ((!domainAlias)||(String(domainAlias).length==0))?projName:domainAlias

  let result = "{\n \"version\":2,\n \"name\":\"" + projName + "\",\n \"alias\":[\"" + domainAlias + "\"],\n \"public\": false,\n \"routes\": [\n"
  const aDir = fs.readdirSync('./build',{encoding:'utf8',withFileTypes:true})
  aDir.forEach(el => {
    if (el.isDirectory()) { result += '   { "src":"^/'+el.name+'/(.*)", "dest":"/'+el.name+'/$1" },\n' }
    else if (el.isFile()||el.isSymbolicLink()) {
      result += '   { "src":"^/'+el.name+'",' + (el.name==='service-worker.js'?' "headers":{"cache-control":"s-maxage=0"},':'') + ' "dest":"/'+el.name+'" },\n'
    }
  })
  result += '   { "src":"^/(.*)", "dest":"/index.html" }'+"\n ]\n}\n"
  return result
}


const projName = 'clavis-vitrea-comms'
const domainAlias = 'clavis-vitrea-comms.mzhukov.now.sh'
fs.writeFileSync('./build/now.json', constructNowJSON(projName,domainAlias), {encoding:'utf8',flag:'w'})
fs.chmodSync('./build/now.json', 0o644)
process.exit(0)

/*
{
 "version": 2,
 "name": "clavis-vitrea-comms",
 "project": "clavis-vitrea-comms",
 "alias": [
   "clavis-vitrea-comms.mzhukov.now.sh"
 ],
 "scope": "mzhukov",
 "env": {
 },
 "public":  false,
 "github": {
   "enabled": false,
   "autoAlias": true,
   "silent": false,
   "autoJobCancelation": true
 }
}
*/
