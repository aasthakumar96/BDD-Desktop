import https  from 'https';
import fs  from 'fs';
import fsp from 'fs/promises';
import mount  from 'mount-dmg';
import { exec }  from 'child_process';
import {promisify} from 'util';
import tmp  from 'tmp';

const tmpobj = tmp.dirSync();
console.log('Dir: ', tmpobj.name);

function downloadBuild() {
  return new Promise<string>((resolve, reject) => {
    const options = {
      method: 'GET',
      host: 'artifactory.corp.adobe.com',
      path:'/artifactory/generic-connectproinstaller-release/ConnectCefApp/Master/osx10-64/2022_6_170/AdobeConnect_2022_6_170.dmg',
      //path: '/artifactory/generic-captivate-release/12.0.0/HDESD/osx10/LS21/24.0.0.develop.5cec52ce/Release-Retail/HDESD/ProjectCharm_LS21.dmg',
      headers: {
        'X-JFrog-Art-Api':
          'AKCp5dKE3WKHppN7mYRs2wBDVNrpdcvsrMK593Qiznm38Zu4fxG2isG4dpyWQyVGBPxNYS7TZ',
      },
    };
    // const options = {
    //   method: 'GET',
    //   host: 'www.tutorialspoint.com',
    //   path: '/cg/images/cgbanner.jpg',
    // };
    const dest = tmpobj.name;
    https.get(options, (res) => {
      const file = dest + '/AdobeConnect_2022_6_170.dmg';
      console.log("The destination file path ==== " + file);
      const writeStream = fs.createWriteStream(file);

      res.pipe(writeStream);

      writeStream.on('finish', () => {
        writeStream.close();
        console.log('Download Completed!');
        resolve(file);
      });

      writeStream.on('error', (err) => {
        // Handle errors
        fs.unlink(); // Delete the file async. (But we don't check the result)
        console.log(err);
        reject(err);
      });
    });
  });
}

export const installBuild = async (file: string) => {
//export const installBuild = () => {
  await checkFileExists(file);
  const mountOptions = await mountDMG(file);

  const installer =  "/Volumes/AdobeConnect/AdobeConnectInstaller.app/Contents/MacOS/AdobeConnectInstaller ";
  //const driverXML = "/Users/surbhimalik/BDD/Project Charm/products/Driver.xml";
  const installCommand =  installer + "--install=1 --silent=1";
  console.log ("The installation command == " + installCommand);

  runCMD(installCommand).then(()=> {
    tmp.setGracefulCleanup();
    fs.rmSync(tmpobj.name, { recursive: true, force: true });
    mountOptions.unmount();
  });
}

const checkFileExists = (file: string) => {
  return fsp.access(file, fs.constants.F_OK);
}

const mountDMG = async(file: string) => {
  const mountOutput = await mount(file)
  console.log({ mountOutput });
  return mountOutput;
}

const runCMD = async(installCommand: string) => {
  const execPromisified = promisify(exec);
  const cmdResult = execPromisified(installCommand);
  return cmdResult;
}

export const downloadAndInstallBuild = () => {
  return downloadBuild().then((path) => {
    return installBuild(path)
  });

}