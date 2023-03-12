# windows UWP apps
they're a bit complicated but not the worst thing in the world. haven't tested with a wide range of programs. only needed for paid apps

modification of [this](https://titleos.dev/bypassing-microsoft-store-licensing/) guide

## materials
- [windows store repository](https://store.rg-adguard.net)
- [7-zip or equivalent](https://www.7-zip.org/)

## prerequisites
- basic knowledge of the windows terminal/7zip
- developer mode turned on in windows

## steps
1. paste link of ms store app into the windows store repository
2. download the app (there'll be a lot of dependencies in the list, you want the one with the the app name, download the one ending with `.appxbundle` or `.appx`)
3. open the downloaded file with 7-zip
4. extract into a folder
   1. if the file is an .appxbundle, extract the .appx that matches your system inside
5. open the extracted folder
6. delete the `AppxSignature.p7x` file
> NOTE: After the next step, you can't delete the extracted files from step 4 without breaking the installed program. Move the folder accordingly.
7. open a powershell window in the folder, and run `Add-AppxPackage -Register .\AppxManifest.xml`
8. the program should now be installed