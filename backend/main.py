import requests
import config
from flask import Flask, request, jsonify

app = Flask(__name__)

api_key = config.api_key

#@app.route('/addpatients', methods=['PATCH'])
#def put_patient():
#    return "hi"


@app.route('/patients/<patient_id>', methods=['PUT'])
def update_patient(patient_id):
    data = request.get_json()
    
    url = "https://data.mongodb-api.com/app/data-eiten/endpoint/data/v1/action/replaceOne"
    headers = {
    "apiKey": api_key,
    "Content-Type": "application/ejson",
    "Accept": "application/json"
    }

    payload = {
    "dataSource": "Cluster0",
    "database": "test_medical_data",
    "collection": "people",
    "filter": {"patient_id": patient_id},
    "replacement": data
    }

    
    # Unfortunately the mongodb api seems to return 200 no matter what,
    # Even if nothing was found to be updated. As a result, I have to
    # check to manually to see if anything was changed in the json
    response = requests.post(url, headers=headers, json=payload)
    tmp = response.json()
    if tmp["matchedCount"] == 1 and tmp["modifiedCount"] == 1:
        return "Success! Status code is " + str(response.status_code)
    else:
        return "Failed to update"

# Delete a Patient (DELETE)
@app.route('/patients/<patient_id>', methods=['DELETE'])
def delete_patient(patient_id):

    url = "https://data.mongodb-api.com/app/data-eiten/endpoint/data/v1/action/deleteOne"
    headers = {
    "apiKey": api_key,
    "Content-Type": "application/ejson",
    "Accept": "application/json"
    }

    payload = {
    "dataSource": "Cluster0",
    "database": "test_medical_data",
    "collection": "people",
    "filter": {"patient_id": patient_id}
    # "filter": { "_id": { "$oid": patient_id } }
    }

    # Send the DELETE request
    response = requests.post(url, headers=headers, json=payload)
    print(response)

    tmp = response.json()
    #return str(tmp)

    # Unfortunately the mongodb api seems to return 200 no matter what,
    # Even if nothing was found to be deleted. As a result, I have to
    # check to manually to see if anything was changed in the json
    response = requests.post(url, headers=headers, json=payload)
    tmp = response.json()
    if tmp["deletedCount"] == 1:
        return "Patient was successfully deleted"
    else:
        return "Failed to delete patient"



@app.route('/addpatients', methods=['POST'])
def insert_patient():

    print(request)

    if request.is_json:
        data = request.get_json()
        name = data.get("name")
        response_data = {"message": f"Received data: {name}"}
        url = "https://data.mongodb-api.com/app/data-eiten/endpoint/data/v1/action/insertOne"
        headers = {
        "apiKey": api_key,
        "Content-Type": "application/ejson",
        "Accept": "application/json"
        }
        payload = {
        "dataSource": "Cluster0",
        "database": "test_medical_data",
        "collection": "people",
        "document": data
        }
        

        # Send the POST request
        response = requests.post(url, headers=headers, json=payload)
        print(response)

        # Check if successfully added
        if response.status_code == 201:
            # Successfully poste to db
            data = response.json()  # Parse JSON response
            print(data)
            return "success"
        else:
            print(f"Request failed with status code: {response.status_code}")
            return "idk"
    else:
        return jsonify({"error": "Invalid JSON data. Could not insert"}), 400
    


@app.route('/patients', methods=['GET'])
def get_patients():
    
    url = "https://data.mongodb-api.com/app/data-eiten/endpoint/data/v1/action/find"
    headers = {
    "apiKey": api_key,
    "Content-Type": "application/ejson",
    "Accept": "application/json"
    }

    payload = {
    "dataSource": "Cluster0",
    "database": "test_medical_data",
    "collection": "people",
    "filter": {}
    }

    # Send the POST request
    response = requests.post(url, headers=headers, json=payload)

    # Check the response status code
    if response.status_code == 200:
        data = response.json()  # Parse JSON response
        print(data)
    else:
        print(f"Request failed with status code: {response.status_code}")
    return data




# y3nMbdJqOAVaexHWXedyM9iYhmQJZ9uPHQqXi9jEj7kCCpDAbTRy6B0IGKJKaxvD
# Set as variable before pushing to github

#Get info for a patient via patient id
@app.route('/patients/<patient_id>', methods=['GET'])
def get_patient(patient_id):

    url = "https://data.mongodb-api.com/app/data-eiten/endpoint/data/v1/action/findOne"
    headers = {
    "apiKey": api_key,
    "Content-Type": "application/ejson",
    "Accept": "application/json"
    }

    payload = {
    "dataSource": "Cluster0",
    "database": "test_medical_data",
    "collection": "people",
    "filter": { "patient_id": patient_id }
    }

    # Send the POST request
    response = requests.post(url, headers=headers, json=payload)

    # Check the response status code
    if response.status_code == 200:
        data = response.json()  # Parse JSON response
        print(data)
    else:
        print(f"Request failed with status code: {response.status_code}")

    return data



if __name__ == '__main__':
    app.run(debug=True)

