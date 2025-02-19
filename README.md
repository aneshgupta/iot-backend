# IOT Backend Service

IOT backend service is used to manage the run time iot sensor data management.


## Run Locally

Clone the project

```bash
  git clone http://10.13.0.66:7990/scm/cwp/nextgen-user-profile-ms.git
```

Go to the project directory

```bash
  cd iot-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Build Locally
First generate build
```bash
  docker build -t iot-backend .
```

Then, run build
```bash
  docker run -p 3000:3000 iot-backend
```

## Authors

- Anesh Gupta [anesh.gupta25@gmail.com]


## License

[MIT](https://choosealicense.com/licenses/mit/)

