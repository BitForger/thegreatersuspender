const {writeFileSync, readFileSync} = require('fs');
const {resolve} = require('path');


require('yargs')
    .scriptName("update-version")
    .usage('$0 <cmd> [args]')
    .command('do [v]', 'Set Version', (yargs) => {
        yargs.positional('v', {
            type: 'string',
            describe: 'the version to set'
        })
    }, function (argv) {
        console.log('version', argv.v)
        let manifest = readFileSync(resolve(__dirname, '../src/manifest.json'), {encoding: 'utf-8'});
        manifest = JSON.parse(manifest);
        manifest.version = argv.v;
        console.log('manifest', manifest)
        writeFileSync(resolve(__dirname, '../src/manifest.json'), JSON.stringify(manifest, null, 2), {encoding: 'utf-8'});
    })
    .help()
    .argv