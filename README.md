

# Bareksa News And Tag

This Repository For Test In PT Bareksa (Market Place Reksadana Online)

### Project Set Up

```
1. Run Your Local Database (mongoDB)
2. npm install -g mocha
3. npm install
4. add file .env with format below
5. npm run test (TESTING)
6. npm run dev (RUN PROJECT)
```

**FORMAT .ENV**

```
PORT=3000
MONGO_CONNECT="mongodb://localhost:27017/bareksa_test"
```



### Routes

Routes For REST API 

- ##### BASE URL

  ```http
  http://34.87.112.197
  ```
  
- **News**

  | Method |    Routes    |          Description          |
  | :----: | :----------: | :---------------------------: |
  |  GET   |    /news     |         Get All News          |
  |  GET   | /news/filter | Filter By Topic , Status, Tag |
  |  GET   |  /news/:id   |         Find One News         |
  |  POST  |    /news     |          Post  News           |
  |  PUT   |  /news/:id   |          Update News          |
  | PATCH  |  /news/:id   |      Update Status News       |
  | DELETE |  /news/:id   |          Delete News          |


- **Tags**

  | Method | Routes                 | Description              |
  | :----: | :--------------------: | :----------------------: |
  | GET    | /tag            | Get All Tags    |
  | GET | /tag/:id | Find One Tag |
  | POST   | /tag/:id           | Post Tag        |
  | PUT | /tag/:id | Update Tag |
  | DELETE | /tag/:id | Delete Tag       |



### Code's Status

- **Success Code's**

  | Code Status | Description |
  | :---------: | :---------: |
  |     200     |   Success   |
  |     201     |   Created   |

- **Error Code's**

  | Code Status |          Description           |
  | :---------: | :----------------------------: |
  |     400     | Bad Request / Validation Error |
  |     404     |           Not Found            |
  |     500     |     Internal server error      |
  



### Detail Request

- #### Get All News

  ------

  Get All News

  - **URL**

    /news

  - **Method:**

    `GET`

  - **URL Params**

    none

  - **Data Body**
    none

  - **Success Response:**

    - **Code:** 200 </br>
    - **Content:** 

      ```json
      [
          {
              "status": "draft",
              "tags": [
                  {
                      "_id": "5e23f5f863491623d194faf4",
                      "name": "federal",
                      "createdAt": "2020-01-19T06:23:52.365Z",
                      "updatedAt": "2020-01-19T06:23:52.365Z"
                  }
              ],
              "_id": "5e23f61463491623d194faf5",
              "title": "Federal Workers Profit From Tobacco and Oil, Even If They Don’t Want To",
              "content": "Many people who work for the Office of the Surgeon General have exposure to tobacco stocks. At the Environmental Protection Agency, scientists make money when polluters do well. And Justice Department lawyers who keep weapons off the streets stake some of their net worth on retailers that sell guns.\n\nAll these federal workers share the same 401(k)-like investment vehicle known as the Thrift Savings Plan. And despite years of effort, they still have no mutual funds on the menu that would allow them to put retirement money into stocks without profiting from industries that some find objectionable.",
              "topic": "investment",
              "createdAt": "2020-01-19T06:24:20.584Z",
              "updatedAt": "2020-01-19T06:24:20.584Z"
          }
      ]
      ```

  

- #### Filter News

  ------

  Filter News by topic or status or tag.

  - **URL**

    /news/filter

  - **Method:**

    `GET`

  - **URL Params**
    
    Query:
    
  ```http
    ?topic=investment&tag=5e23f5f863491623d194faf4&status=draft
  ```

  | Parameter | description                                     |
  | --------- | ----------------------------------------------- |
  | topic     | Input = [String] list of topic                  |
  | tag       | id of tag                                       |
  | status    | Input = [String]  "draft", "deleted", "publish" |

  - **Data Body**
    none

  - **Success Response:**

    - **Code:** 200 </br>
    - **Content:** 

      ```json
      [
          {
              "status": "draft",
              "tags": [
                  {
                      "_id": "5e23f5f863491623d194faf4",
                      "name": "federal",
                      "createdAt": "2020-01-19T06:23:52.365Z",
                      "updatedAt": "2020-01-19T06:23:52.365Z"
                  }
              ],
              "_id": "5e23f61463491623d194faf5",
              "title": "Federal Workers Profit From Tobacco and Oil, Even If They Don’t Want To",
              "content": "Many people who work for the Office of the Surgeon General have exposure to tobacco stocks. At the Environmental Protection Agency, scientists make money when polluters do well. And Justice Department lawyers who keep weapons off the streets stake some of their net worth on retailers that sell guns.\n\nAll these federal workers share the same 401(k)-like investment vehicle known as the Thrift Savings Plan. And despite years of effort, they still have no mutual funds on the menu that would allow them to put retirement money into stocks without profiting from industries that some find objectionable.",
              "topic": "investment",
              "createdAt": "2020-01-19T06:24:20.584Z",
              "updatedAt": "2020-01-19T06:24:20.584Z"
          }
      ]
      ```

  

- #### Get Detail News

  ------

  Get detail News

  - **URL**

    /news/:id

  - **Method:**

    `GET`

  - **URL Params**
    
    id = [String] _id of News in database
    
  - **Data Body**
    none
  
  - **Success Response:**

    - **Code:** 200 </br>
    - **Content:** 
  
      ```json
      { 
          "status": "draft",
          "tags": [
              {
                  "_id": "5e23f5f863491623d194faf4",
                  "name": "federal",
                  "createdAt": "2020-01-19T06:23:52.365Z",
                  "updatedAt": "2020-01-19T06:23:52.365Z"
              }
          ],
          "_id": "5e23f61463491623d194faf5",
          "title": "Federal Workers Profit From Tobacco and Oil, Even If They Don’t Want To",
          "content": "Many people who work for the Office of the Surgeon General have exposure to tobacco stocks. At the Environmental Protection Agency, scientists make money when polluters do well. And Justice Department lawyers who keep weapons off the streets stake some of their net worth on retailers that sell guns.\n\nAll these federal workers share the same 401(k)-like investment vehicle known as the Thrift Savings Plan. And despite years of effort, they still have no mutual funds on the menu that would allow them to put retirement money into stocks without profiting from industries that some find objectionable.",
          "topic": "investment",
          "createdAt": "2020-01-19T06:24:20.584Z",
          "updatedAt": "2020-01-19T06:24:20.584Z"
      }
      ```
  
  

- #### Create News

  ------

  Create News.

  - **URL**

    /news

  - **Method:**

    `POST`

  - **URL Params**
    none

  - **Data Body**
    
    ```
      title = [string] requited
      content = [string] required
      tag = [string][Array] required
      topic = [String] required
    ```
    
  - **Success Response**
  
    - **Code: 200** </br>
    - **Content:** 
  
      ```json
      {
          "status": "draft",
          "tags": [
              "5e23f5f863491623d194faf4"
          ],
          "_id": "5e23f61463491623d194faf5",
          "title": "Federal Workers Profit From Tobacco and Oil, Even If They Don’t Want To",
          "content": "Many people who work for the Office of the Surgeon General have exposure to tobacco stocks. At the Environmental Protection Agency, scientists make money when polluters do well. And Justice Department lawyers who keep weapons off the streets stake some of their net worth on retailers that sell guns.\n\nAll these federal workers share the same 401(k)-like investment vehicle known as the Thrift Savings Plan. And despite years of effort, they still have no mutual funds on the menu that would allow them to put retirement money into stocks without profiting from industries that some find objectionable.",
          "topic": "investment",
          "createdAt": "2020-01-19T06:24:20.584Z",
          "updatedAt": "2020-01-19T06:24:20.584Z"
      }
      ```
  
  
  
- #### **Update News**
  
  ------
  
  Update All Data News
  
  - **URL**
  
    /news/:id
  
  - **Method:**
  
    `PUT`
  
  - **URL Params**
    id = [String] _id of data News
  
  - **Data Body**
  
    ```
      title = [string] requited
      content = [string] required
      tag = [string][Array] required
      topic = [String] required
      status = [String] ("draft", "publish", "deleted")
    ```
  
  - **Success Response**
  
    - **Code: 200**</br>
    - **Content:** 
  
      ```json
      {
          "status": "publish",
          "tags": [
              "5e23f5f863491623d194faf4"
          ],
          "_id": "5e23f61463491623d194faf5",
          "title": "Federal Workers Profit From Tobacco and Oil, Even If They Don’t Want To",
          "content": "Many people who work for the Office of the Surgeon General have exposure to tobacco stocks. At the Environmental Protection Agency, scientists make money when polluters do well. And Justice Department lawyers who keep weapons off the streets stake some of their net worth on retailers that sell guns.\n\nAll these federal workers share the same 401(k)-like investment vehicle known as the Thrift Savings Plan. And despite years of effort, they still have no mutual funds on the menu that would allow them to put retirement money into stocks without profiting from industries that some find objectionable.",
          "topic": "investment",
          "createdAt": "2020-01-19T06:24:20.584Z",
          "updatedAt": "2020-01-19T06:24:20.584Z"
      }
      ```
  
  
  
- #### **Update Status News**

  ------

  Update Data status News

  - **URL**

    /news/:id

  - **Method:**

    `PATCH`

  - **URL Params**
    id = [String] _id of data News

  - **Data Body**

    ```
    status = [String] ("draft", "publish", "deleted")
    ```

  - **Success Response**

    - **Code: 200**</br>
    - **Content:** 

      ```json
      {
          "status": "draft",
          "tags": [
              "5e23f5f863491623d194faf4"
          ],
          "_id": "5e23f61463491623d194faf5",
          "title": "Federal Workers Profit From Tobacco and Oil, Even If They Don’t Want To",
          "content": "Many people who work for the Office of the Surgeon General have exposure to tobacco stocks. At the Environmental Protection Agency, scientists make money when polluters do well. And Justice Department lawyers who keep weapons off the streets stake some of their net worth on retailers that sell guns.\n\nAll these federal workers share the same 401(k)-like investment vehicle known as the Thrift Savings Plan. And despite years of effort, they still have no mutual funds on the menu that would allow them to put retirement money into stocks without profiting from industries that some find objectionable.",
          "topic": "investment",
          "createdAt": "2020-01-19T06:24:20.584Z",
          "updatedAt": "2020-01-19T06:24:20.584Z"
      }
      ```

  

- #### **Delete News**

  ------

  Delete Data News

  - **URL**

    /news/:id

  - **Method:**

    `DELETE`

  - **URL Params**
    id = [String] _id of data News

  - **Data Body**

    none

  - **Success Response**

    - **Code: 200**</br>
    - **Content:** 

      ```json
      {
          "status": "draft",
          "tags": [
              "5e23f5f863491623d194faf4"
          ],
          "_id": "5e23f61463491623d194faf5",
          "title": "Federal Workers Profit From Tobacco and Oil, Even If They Don’t Want To",
          "content": "Many people who work for the Office of the Surgeon General have exposure to tobacco stocks. At the Environmental Protection Agency, scientists make money when polluters do well. And Justice Department lawyers who keep weapons off the streets stake some of their net worth on retailers that sell guns.\n\nAll these federal workers share the same 401(k)-like investment vehicle known as the Thrift Savings Plan. And despite years of effort, they still have no mutual funds on the menu that would allow them to put retirement money into stocks without profiting from industries that some find objectionable.",
          "topic": "investment",
          "createdAt": "2020-01-19T06:24:20.584Z",
          "updatedAt": "2020-01-19T06:24:20.584Z"
      }
      ```

  

- #### **Get All Tags**

  ------

  Get All Data Tags in Database

  - **URL**

    /tags

  - **Method:**

    `GET`

  - **URL Params**

    none

  - **Data Body**
    none

  - **Success Response:**

    - **Code:200**</br>
    - **Content:** 

      ```json
      [
          {
              "_id": "5e23f5f863491623d194faf4",
              "name": "federal",
              "createdAt": "2020-01-19T06:23:52.365Z",
              "updatedAt": "2020-01-19T06:23:52.365Z"
          }
      ]
      ```

  

- #### Get One Data Tags

  ------

  Get One Data Tag in Database

  - **URL**

    /tags/:id

  - **Method:**

    `GET`

  - **URL Params**

    id = [String] _id of data Tag

  - **Data Body**
    none

  - **Success Response:**

    - **Code:200**</br> 
    -  **Content:** 

      ```json
      {
          "_id": "5e23f5f863491623d194faf4",
          "name": "federal",
          "createdAt": "2020-01-19T06:23:52.365Z",
          "updatedAt": "2020-01-19T06:23:52.365Z"
      }
      ```

  

- #### Create Tag

  ------

  Create Data Tag to Database

  - **URL**

    /tag

  - **Method:**

    `POST`

  - **URL Params**
    none

  - **Data Body**

    ```
      name = [string] requited
    ```

  - **Success Response**

    - **Code: 200**</br> 
    - **Content:** 

      ```json
      {
          "_id": "5e246ce7e6bfee1b990f75a6",
          "name": "money",
          "createdAt": "2020-01-19T14:51:19.117Z",
          "updatedAt": "2020-01-19T14:51:19.117Z"
      }
      ```

  

- #### **Update Tag**

  ------

  Update Data Tag from Database

  - **URL**

    /tag/:id

  - **Method:**

    `PUT`

  - **URL Params**
    id = [String] _id of data Tag

  - **Data Body**

    ```
      name = [string] requited
    ```

  - **Success Response**

    - **Code: 200**</br> 
    - **Content:** 

      ```json
      {
          "_id": "5e246ce7e6bfee1b990f75a6",
          "name": "money",
          "createdAt": "2020-01-19T14:51:19.117Z",
          "updatedAt": "2020-01-19T14:51:19.117Z"
      }
      ```

  

- #### **Delete Tag**

  ------

  Delete Data Tag 

  - **URL**

    /tag/:id

  - **Method:**

    `Delete`

  - **URL Params**
    id = [String] _id of data Tag

  - **Data Body**

    none

  - **Success Response**

    - **Code: 200**</br> 
    - **Content:** 

      ```json
      {
          "_id": "5e246ce7e6bfee1b990f75a6",
          "name": "money",
          "createdAt": "2020-01-19T14:51:19.117Z",
          "updatedAt": "2020-01-19T14:51:19.117Z"
      }
      ```
