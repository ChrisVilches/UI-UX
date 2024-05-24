# UI & UX Training

A repository that contains several applications made with the purpose of practicing the following:

* UI/UX Design
* Frontend (general skills)
* React.js (and other frameworks)
* CSS

## App List

| Live Demo | Description |
|--|--|
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/anim-3d.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/anim-3d) | <h3>anim-3d ([Live Demo](https://ui-ux.chrisvilches.com/anim-3d))</h3>Small app made with Three.js and React. |
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/hexagon.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/hexagon) | <h3>hexagon ([Live Demo](https://ui-ux.chrisvilches.com/hexagon))</h3>Responsive hexagonal grid design. |
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/signal.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/signal) | <h3>signal ([Live Demo](https://ui-ux.chrisvilches.com/signal))</h3>A React demo app to demonstrate the signals feature. |
| [<img src="https://github.com/ChrisVilches/UI-UX/blob/main/screenshots/sticky.jpg?raw=true" width=250>](https://ui-ux.chrisvilches.com/sticky) | <h3>sticky ([Live Demo](https://ui-ux.chrisvilches.com/sticky))</h3>Layout with sticky elements (desktop only). |

## Deployment

First set environment variables:

```sh
export BASE_URL=http://localhost:3000/
```

Build all apps:

```sh
npm run build
```

Take screenshots. First make sure apps are running in the specified base url:

```sh
npm run gen-screenshots
```

Generate readme:

```sh
npm run gen-readme
```
