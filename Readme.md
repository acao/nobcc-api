## Intro

Allows one to create an HTTP server around multiple python scripts. Great for doing computations and such with numpy/scipy, etc

Credit to @astenta and @egassama for providing the python scripts as part of this challenge

## Getting Started

1. ``npm install``
2. ``npm start``

## Requirements

* Python 2.7
* Node 6.22
* watchman (for development - brew install watchman)

## Add scripts

1. Add the script to python/ directory
2. Add it to scripts in config.toml:

```js
[[scripts]]
singleArg = true # default false
name = "rainfall"
path = "Uniaxial_CycleCount/CalculateUniaxial.py"
```

## Python script behavior

* should accept stdin arguments from sys.argv as strings or JSON strings
* should print the results as a JSON string to stdout - print() seems to work fine

Eventually, this could also be installed globally and executed with local commands

## Making HTTP requests

* can accept a single argument if the singleArg is set to true (helpful for sending an array as a single arg to the python script)


### Rainfall Example: Single arg of array

Config:

```js
[[scripts]]
singleArg = true # default false
name = "rainfall"
path = "Uniaxial_CycleCount/CalculateUniaxial.py"
```

**POST /calculate/rainfall/**


**1. HTTP Request**
```json
[
  [0,1,2,3,4,6],
  [0,200,-100,300,-200,100],
  [0,0.02,-0.01,0.03,-0.02,0.01]
]
```

**2. Executes (behind the scenes)**
```
$: python python/Uniaxial_CycleCount/CalculateUniaxial.py "[[0,1,2,3,4,6], [0,200,-100,300,-200,100], [0,0.02,-0.01,0.03,-0.02,0.01]]"
```

**3.  Which Returns: (behind the scenes)**
```
[["6 to 1", 0.01, 200, 150], ["4 to 2", 0.01, 200, 0]]
```

**4. HTTP Response**

```json
[
  [
    "6 to 1",
    0.01,
    200,
    150
  ],
  [
    "4 to 2",
    0.01,
    200,
    0
  ]
]
```

### POST /calculate/hyopthetical

**1. Request**
```json
[
  [0,1],
  "examplArg",
  {"prop": "exampleObj"}
]
```

**2. Executes (behind the scenes)**
```
$: python python/example/example.py "[0,1]" "exampleArg" "{"prop": "exampleObj"}"
```

**3.  Which Returns: (behind the scenes)**
```
[["6 to 1", 0.01, 200, 150], ["4 to 2", 0.01, 200, 0]]
```

**Response**

```json
[
  [
    "6 to 1",
    0.01,
    200,
    150
  ],
  [
    "4 to 2",
    0.01,
    200,
    0
  ]
]
```
