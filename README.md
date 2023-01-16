# Yolo Group Demo assessment

A technical assessment for the **Software Engineer in Test** position.

## The project 💻

The following project was made using **TS, Cypress, Artillery, Postman**. Review [here](ExBanking_for_test_assignment_(1).pdf) the assessment proposed. Here is the [test plan](TestCases.md)!

Do you want to create a UI framework based on this project? Check this [branch](https://github.com/ArCiGo/TS-Automation-Framework/tree/master)!

## Tools ⚙️

* *TypeScript v4.7.4*.
* *Artillery v2.0.0-27*.
* *Cypress v10.3.1*.
* *cypress-mochawesome-reporter v3.2.0*.
* *Postman v10.7.3*.
* *GitHub Actions*.
* *Docker*.

## Main project structure 🗂️

```
.
├── .github/
│   └── workflow/
│       └── main.yml
├── cypress/
│   ├── e2e/
│   │   └── api.mockServer.spec.cy.ts
│   ├── fixtures/
│   │   ├── requests/
│   │   │   ├── depositsPostRequest.json
│   │   │   ├── transfersPostRequest.json
│   │   │   ├── usersPostRequest.json
│   │   │   └── withdrawalsPostRequest.json
│   │   └── responses/
│   │       ├── balanceGetResponse.json
│   │       ├── depositsPostResponse.json
│   │       ├── existingUserPostResponse.json
│   │       ├── transfersPostResponse.json
│   │       ├── usersGetResponse.json
│   │       ├── usersPostResponse.json
│   │       └── withdrawalsPostResponse.json
│   ├── support/
│   │   ├── commands.ts
│   │   ├── e2e.ts
│   │   └── index.ts
│   └── tsconfig.json
├── performanceResults
└── performanceTests/
    └── performance.yml
```

## Setup 🛠️

## Installing the node modules

Open your favorite terminal (or you can use the terminal provided by Visual Studio Code)

1. Clone the repo on your computer at any path you want.-

```bash
> git clone https://github.com/ArCiGo/YoloGroupDemo

> git checkout master
```

2. In the path you cloned the repo, open the project folder and install the packages.-
```bash
> cd YoloGroupDemo

> npm i
```

3. Open Postman and import the collection script (`ExBanking.postman_collection.json`) located in the `postman` folder (click on image to see the video).

[![Import Postman collection](/Img01_Postman.png)](https://user-images.githubusercontent.com/32103862/212745565-d80f540b-cb12-4bde-a0e5-10a4b9811c9c.mp4)

4. Now import the environment (`ExBanking.postman_environment.json`) located in the `postman` folder (click on image to see the video).

[![Import environment collection](/Img02_Postman.png)](https://user-images.githubusercontent.com/32103862/212745567-2ce1091e-dcda-478a-987f-ec3ccf354a7f.mp4).

5. Now it is time to create a mock server to run everything. Just remember to use the existing collection you already imported. Once the mock server is created, copy the URL and paste it in the URL variable located in the ExBanking environment (do a double check to verify if the URL is correct). Now, you are able to execute the scripts in Postman! (click on image to see the video).

[![Create mock server](/Img03_Postman.png)](https://user-images.githubusercontent.com/32103862/212745560-1a4317d6-0698-46d6-b287-ea570f88778c.mp4).

6. Replace the `baseUrl` value, located in the `cypress.config.ts` file (at root level of the project) with the URL of the mock server. Perform the same action for the `target` value located in the `performance.yml` file (`performanceTests` folder) with the URL of the mock server.

## Running the tests ⚡
```bash
# If you don't want to open the Cypress GUI, you can execute the following commands:
> npm run cypress:open:cli
# or
> npm run html-report

When you run the tests, a new folder is generated inside the `cypress` folder (`reports`). This folder contains the report for the executed tests. If a test fails, the report will include a screenshot to see what the failure was.

# If you want to open the GUI:
> npm run cypress:open
```

```bash
# Before to run the Artillery tests, create a performanceResults folder, at root level of the project, and then run the following command:
> npm run artillery:test
```

## Docker 🐋

If you want to execute the Cypress tests using Docker, you can do the following in your terminal at the workspace project.-

```bash
# Without a Dockerfile

# Pull the Cypress Docker image you need to run the tests. You can use the latest one
> docker pull cypress/included:9.4.1

# Execute the following command to see the info of the image
> docker run -it --entrypoint=cypress cypress/included:9.4.1 info

# Then, execute the following command to run the tests inside of the container
> docker run -it -v $(pwd):/e2e -w /e2e cypress/included:9.4.1 --spec cypress/e2e --browser electron
```

```bash
# With a Dockerfile

# Execute the following command to compile the file. <YourVersionTag> may be any value you want
> docker build -t my-cypress-image:<YourVersionTag> .

# Then, execute the following command to run the tests inside of the container
> docker run -i -v $(pwd):/my-cypress-project -t my-cypress-image:<YourVersionTag> --spec cypress/e2e
```

## To consider 👀

* As the assessment says, this project uses a mock server. Once the Development team develops the **ExBanking** services, and is ready to use, the tests will be updated with the right URL and endpoints. If needed the requests and responses might be updated.
* Postman has a limitation with the Mock Servers feature. For a free user there is a limit of 1,000 calls per month. For the rest of the users (pay), 10,000 calls per month. Take this into consideration at the moment of running the tests.