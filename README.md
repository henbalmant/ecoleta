# Ecoleta
1. [Setup local application](https://github.com/henbalmant/ecoleta/new/master?readme=1#setup-local-application)
2. [Setup Mobile app](https://github.com/henbalmant/ecoleta/new/master?readme=1#mobile)
3. [Setup Web](https://github.com/henbalmant/ecoleta/new/master?readme=1#web)
4. [Endpoints](https://github.com/henbalmant/ecoleta/new/master?readme=1#endpoints)
---

<p align="center">Basic web and mobile app to waste management.

<p align="center"><img src="https://github.com/henbalmant/ecoleta/blob/master/banner.png?raw=true" width=75%></p>

## Setup local application

1. Install all dependencies

| Name    | Version | Website            |
|---------|:-------:|--------------------|
| Node.js | ^11.X   |https://nodejs.org/ |
| React   | ^6.X    |https://reactjs.org/|
| Expo CLI| ^3.X    |http://expo.io/     |

2. Install all node_modules with `npm install` inside each application
3. Run `npm run dev` inside `./server` to start backend application

#### Mobile
1. After starting backend go to `./mobile` and run `npm start`
2. Download [Expo](https://expo.io/) on your phone. Either iOS and Android will do.
3. Scan the QR code genereted by Expo on terminal
4. Copy the address available and exchange this:
```typescript
./server/src/controllers/ItemsController.ts

14                 image_url: `http://${YOUR_EXPO_ADDRESS_HERE}:3333/uploads/${item.image}`,
```

> This will get icon images on mobile app.
> I didn't find a better way to do it so I'm doing it manually for now.

<h5><p align="center">Screenshot</p></h5>

<p align="center"><img src="https://github.com/henbalmant/ecoleta/blob/master/mobile-app.png?raw=true" width=100%></p>

#### Web
1. Run `npm start` inside `./web` folder
2. Access `http://localhost:3000` on your browser
4. Verify if ItemsController has the right URL. If it doesn't put it on:
```typescript
./server/src/controllers/ItemsController.ts

14                 image_url: `http://localhost:3333/uploads/${item.image}`,
```

<h5><p align="center">Screenshots</p></h5>

<p align="center">Home</p>

<p align="center"><img src="https://github.com/henbalmant/ecoleta/blob/master/home-web.png?raw=true" width=75%></p>

<p align="center">Create Collect Point</p>

<p align="center"><img src="https://github.com/henbalmant/ecoleta/blob/master/create-point-web.png?raw=true" width=75%></p>

## Endpoints

The backend from this application has some endpoints that can be accessed by this routes:

| Method | Endpoint                | Params            | Result                                          |
|:------:|-------------------------|:-----------------:|-------------------------------------------------|
| GET    | `/items`                | none              | List items                                      |
| GET    | `/collect_points`       | city, uf, items*  | List filtered collect points                    |
| GET    | `/collect_points/${id}` | collect_point.id  | List a specific collect point by id             |
| POST   | `/collect_points`       | none**            | Create a collect point                          |

*`GET /collect_points` has city and uf params deactivated. [Click here](https://github.com/henbalmant/ecoleta/blob/078f1df436ffb6d0e2ff01a7109b3fd39176ccfe/server/src/controllers/CollectPointsController.ts#L82) to see it.

**`POST /collect_points` needs a JSON body like this one above:
```json
{       
	"name": "Ponto de Coleta 1",
	"email": "contato@pontodecoleta.com.br",
	"whatsapp": "31999999999",
	"latitude": -19.9317,
	"longitude": -43.9779, 
	"city": "Belo Horizonte",
	"uf": "MG",
	"items": [
		6, 1, 2
	]
}
```

