from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://joshuarm8118:Frx4v3HVAOmgQtrY@cluster0.hp6br6z.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["test_medical_data"]
collection = db["people"]

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    # data = {"testkey": "testval"}
    # collection.insert_one(data)
except Exception as e:
    print(e)



