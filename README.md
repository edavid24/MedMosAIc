# MedMosaic
HackRPI X Project 

## The Problem
After hearing that approximately 250,000 people die every year from medical errors, and millions more suffer serious harm, we knew we had to do something about it. Our goal with MedMosaic is to
fight those number by helping reduce medication errors.

## What We Do
MedMosaic has many features. The first is a comprehensive list of all the medicine the patient is currently taking, as well as important physical features that may be relevent when treating the patient. The second is a system that automatically checks to see if the medications currently being taken will have any adverse effects, whether with each other, a persons allergies, or other
factors. Finally, MedMosaic also has a checklist for all of the meds that need to be taken by each patient, with information as to when and how the medication should be administered.

## How We Do It
We start with a parser that takes in real medical data from real CCDs. We then store this information in MongoDB Atlas, where our backend grabs it and passes it to our frontend as needed. If a doctor tries to enter a new drug, an API call is made to the NLM Drug Interaction API to ensure that it is safe.

## Built With
- HTML/JS/CSS
- MongoDB
- React.js
- PythonAnywhere
- Python + Requests + Flask
- National Library of Medicine: Drug Interaction API

## Don't Believe Us? Try it Yourself
