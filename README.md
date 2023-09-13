# **Native<span style="color:#cc1d5e">Chat</span>**

### Table of contents:

1. [Project overview](#star-about)
2. [Technologies used](#computer-tools-and-tech-used)
3. [Installation and quickstart usage instructions](#zap-quickstart)
4. [Project walkthrough](#movie_camera-project-walkthrough)

## :star: About

NativeChat is a web chat application which can break the translation barrier for you to focus on the conversation at hand🙂.

<img src="./frontend/public/favicon.png" alt="App Logo">

### Features :sparkler: -

- Authentication **(username, password)**
- Basic chat functionality **_(to be implemented)_**
- Integrated Postgresql database for storing conversations and messages **_(to be implemented)_**
- Translate any message to your language **_(to be implemented)_**
- Auto-translate feature for hassle free translation **_(to be implemented)_**

<a href="#" style="color:#cc1d5e">Go to top 👆🏻</a>

## :computer: Tools and Tech used

<img src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React" width="60"> <img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png"  alt="Typescript" title="Typescript" width="60"> <img src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL" width="60"> <img src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="ExpressJS" title="ExpressJS" width="60"> <img src="https://socket.io/images/logo.svg" alt="Socket.IO" title="Socket.IO" width="60"> <img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="NodeJS" title="NodeJS" width="60"> <img src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="TailwindCSS" title="TailwindCSS" width="60"> <img src="https://user-images.githubusercontent.com/25181517/192158956-48192682-23d5-4bfc-9dfb-6511ade346bc.png" alt="Sass" title="Sass" width="60"> <img src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" alt="REST guidelines" title="REST guidelines" width="60"> <img src="https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35" alt="Vite" title="Vite" width="60"> <img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="NPM" title="NPM" width="60"> <img src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="VSCode" title="VSCode" width="60"> <img src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git" width="60">

<!-- <img src="" alt="" title="" width="60"> -->

<br>
<a href="#" style="color:#cc1d5e">Go to top 👆🏻</a>

## :zap: Quickstart

The project is a monorepo containing both the **_"frontend"_** and the **_"backend"_** code together.

Follow the steps below to work through the project:

**Frontend -**

1. Enter the _frontend_ directory and install required packages

   ```
   cd frontend
   npm i
   ```

2. An environment variable(_.env_) for the server url named **VITE_SERVER_BASE_URL** can be customized.

   <span style="color:red; font-size:16px">NOTE:</span>
   <span style="font-size:16px">Changes to the **VITE_SERVER_BASE_URL** variable must sync with the **URL** where your _backend_ is running.</span>

3. Start the development server locally using:

   ```
   npm run dev
   ```

4. You can generate a build for the project using:
   ```
   npm run build
   ```

**Backend -**

1. Enter the _backend_ directory and install required packages
   ```
   cd backend
   npm i
   ```
2. The environment file(_.env_) requires a **DATABASE_URL** variable to be set for the _Prisma_ ORM to work.

   <span style="color:red; font-size:16px">NOTE:</span>
   <span style="font-size:16px">PostgreSQL database is being used for the project and must be setup beforehand.</span>

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

   You can refer to <a href="https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-url" style="color:#cc1d5e">this link</a> for more information on _Prisma_ setup with PostgreSQL.

   <span style="color:red; font-size:16px">NOTE:</span>
   <span style="font-size:16px">Other variables such as **PORT**, **CLIENT_URL**, **JWT_ACCESS_TOKEN_SECRET**, **JWT_REFRESH_TOKEN_SECRET**, can be customized.
   <br>
   <br>
   Changes to **PORT** must be reflected in the **VITE_SERVER_BASE_URL** environment variable in the _frontend_
   </span>
   <br>
   <br>
   Changes to **CLIENT_URL** must be in sync with the **URL** where your _frontend_ is running
   </span>

3. Sync your database with the _Prisma schema_ using the following command:

   ```
   npx prisma db push
   ```

4. Run the development server locally using following command:

   ```
   npm run dev
   ```

5. To build the project, use following command:

   ```
   npm run build
   ```

6. To start the production server, use following command:
   ```
   npm start
   ```
   <br>

**Additional Info**

A JSON file named _[thunder-collection_NativeChat backend.json](<backend/thunder-collection_NativeChat backend.json>)_ is provided for the _Backend_ endpoints testing using the VSCode **Thunder Client** extension. This file can be imported in the extension's tab to obtain the saved _collections_ used for testing

<a href="#" style="color:#cc1d5e">Go to top 👆🏻</a>

## :movie_camera: Project Walkthrough

To be made after project phase completed. Sorry to keep you waiting!

<a href="#" style="color:#cc1d5e">Go to top 👆🏻</a>
