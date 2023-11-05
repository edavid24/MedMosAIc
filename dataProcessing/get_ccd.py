from pymongo import MongoClient
import os
import ccda
import datetime
import types
from protorpc import messages
import csv

def convert_fieldlist_to_list(fieldlist):
    # This assumes each item in the FieldList has a `__dict__` that can be converted to a dict
    result_list = []
    for item in fieldlist:
        item_dict = {k: convert_to_dict(v) for k, v in item.__dict__.items() if not k.startswith('_')}
        result_list.append(item_dict)
    return result_list



def convert_to_dict(obj):
    """
    This function recursively converts a protorpc message or a FieldList to a dictionary.
    """
    if isinstance(obj, messages.Message):
        # Convert the message to a dictionary
        result = {}
        for field in obj.all_fields():
            value = getattr(obj, field.name)
            if value is not None:
                result[field.name] = convert_to_dict(value)
        return result
    elif isinstance(obj, messages.FieldList):
        # Convert the FieldList to a list of dictionaries
        return [convert_to_dict(item) for item in obj]
    elif isinstance(obj, datetime.datetime):
        # Convert datetime to ISO 8601 string
        return obj.isoformat()
    elif isinstance(obj, (int, float, str, bool)):
        # Return primitive types as is
        return obj
    else:
        # This will cover other types like lists of primitives or dictionaries
        return obj


def get_name(file_path):
    with open(file_path, 'r') as file:
        ccda_document = ccda.CcdaDocument(file)
        csv = ccda_document.to_csv()
        csv=csv.split('\n')
        csv=csv[1].split(',')
        return(csv[0],csv[1])
        
        
def parse_ccda(file_path):
    with open(file_path, 'r') as file:
        ccda_document = ccda.CcdaDocument(file)
        
        # Convert the document using the to_message() method
        message = ccda_document.to_message()

        allergies_data = ccda.CcdaTree.get_allergies(ccda_document)

        names = get_name(file_path)
        
        # Convert message sections to dictionaries for other sections
        patient_data = {
            "patient": {"first_name": names[0], "last_name": names[1]},
            'allergies': allergies_data,  # Directly use the output from get_allergies()
            'labs': convert_to_dict(message.labs) if hasattr(message, 'labs') else [],
            'medications': convert_to_dict(message.medications) if hasattr(message, 'medications') else [],
            'problems': convert_to_dict(message.problems) if hasattr(message, 'problems') else [],
            'procedures': convert_to_dict(message.procedures) if hasattr(message, 'procedures') else [],
            'vitals': convert_to_dict(message.vitals) if hasattr(message, 'vitals') else [],
            'demographics': convert_to_dict(message.demographics) if hasattr(message, 'demographics') else None,
            'immunizations': convert_to_dict(message.immunizations) if hasattr(message, 'immunizations') else []
        }


    return patient_data

# Set up your MongoDB Atlas connection
database_name = 'test_medical_data'
collection_name = 'people'

# Ensure that the DATABASE_URI environment variable is set correctly
uri = os.environ.get("DATABASE_URI")
if uri is None:
    print("DATABASE_URI environment variable is not set.")
    exit()

try:
    client = MongoClient(uri)
    db = client[database_name]
    collection = db[collection_name]
    print("Connected to MongoDB Atlas")
except Exception as e:
    print(f"Error connecting to MongoDB: {str(e)}")
    exit()

# File path to your C-CDA file
ccda_file_path = 'CCDFiles\example.xml'

# Parse the C-CDA file
parsed_data = parse_ccda(ccda_file_path)

# Insert the parsed data into MongoDB
if parsed_data is not None:
    try:
        collection.insert_one(parsed_data)
        print('Data inserted into MongoDB Atlas')
    except Exception as e:
        print(f"Error inserting data into MongoDB: {str(e)}")
else:
    print('No data to insert')
