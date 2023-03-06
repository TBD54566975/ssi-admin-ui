import { mockDID } from "./didJson"

export const mockSchemaRequest = {
    "author": mockDID.id,
    "name": "User Alice",
    "schema": {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "description": "Employee Status VC",
        "type": "object",
        "properties": {
          "givenName": {
            "type": "string"
          },
          "employedAt": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          }
        },
        "additionalProperties": false
    },
    "sign": false
}

export const mockSchemaResponse = {
    "id": "b28feb61-e0b8-454a-86ed-d487a46e8584",
    "schema": {
      "type": "https://w3c-ccg.github.io/vc-json-schemas/schema/2.0/schema.json",
      "version": "1.0",
      "id": "b28feb61-e0b8-454a-86ed-d487a46e8584",
      "name": "Acme",
      "author": "did:key:z6MkpEQY4FCCtJEVpZ6gGK541fYWynH2ya7D1RikTGfdydCF",
      "authored": "2022-12-09T18:04:06Z",
      "schema": {
        "$id": "26dfd04a-39e1-461f-af04-f1f92a8783f2",
        "$schema": "http://json-schema.org/draft-07/schema#",
        "additionalProperties": false,
        "description": "Employee Status VC",
        "properties": {
          "employedAt": {
            "type": "string"
          },
          "givenName": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "friends": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "ideas": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                } 
            } 
          },
          "lastName": {
            "type": "string"
          }
        },
        "required": [],
        "type": "object"
      }
    }
}