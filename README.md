# course-project-bic
## Neuroimaging Data Processing and Visualization Pipeline


## INSTRUCTIONS TO INSTALL EXTERNAL DEPENDENCIES FOR fMRIPrep:
 FSL on MAC OS:
 * Open terminal on Mac (can be found in /Applications/Utilities)
 * Run the following on Terminal: cd ~/Downloads and python fslinstaller.py
 * If the Python command does not run, this is because some versions of macOS do not have Python installed by default. To install Python, follow the directions on https://www.python.org.
 * NOTE!!!: Installation can take hours, once you see "Installing FSL into Users/yourname/fsl... [######} 100/100%", do not terminate the terminal, keep it running until you see "FSL successfully installed."
 * To check if FSL has been installed on your laptop correctly run the following commands:
 * *echo $FSLDIR*
 * *flirt -version*
 * *which imcp*
 FREESURFER on MAC OS:
