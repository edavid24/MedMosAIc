from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

# just gets fromm local environment
# set with 
# export DATABASE_URI="your_actual_uri"
DB_URI = os.environ.get("DB_URI")

uri = DB_URI

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



