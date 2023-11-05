Senior Design Project (Team BIC)
## Neuroimaging Data Processing and Visualization Pipeline


## Instructions to install external dependencies for fMRIPrep:
 FSL on MAC OS:
 * https://fsl.fmrib.ox.ac.uk/fsl/fslwiki/
 * Open terminal on Mac (can be found in /Applications/Utilities)
 * Run the following on Terminal: cd ~/Downloads and python fslinstaller.py
 * If the Python command does not run, this is because some versions of macOS do not have Python installed by default. To install Python, follow the directions on https://www.python.org.
 * NOTE!!!: Installation can take hours, once you see "Installing FSL into Users/yourname/fsl... [######} 100/100%", do not terminate the terminal, keep it running until you see "FSL successfully installed."
 * To check if FSL has been installed on your laptop correctly run the following commands:
 * *echo $FSLDIR*
 * *flirt -version*
 * *which imcp*


 FREESURFER on MAC OS:
 * https://surfer.nmr.mgh.harvard.edu/fswiki/DownloadAndInstall
 * Before, you start, make sure you have enough storage on your laptop (about 16-20 GB of free space), or else it will keep terminating the installation process.
 * Make sure to download and install the Xquartz 2.8.2 release from https://www.xquartz.org before installing Freesurfer.
 * On the above link, click the 7.X_releases link. From there, scroll down to 7.3.2 release.
 * Install the last link from the 7.3.2 release which is: freesurfer-darwin-macOS-7.3.2.pkg.
 * 


