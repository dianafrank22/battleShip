// submit cpuCoordinates
// end game
// check status
// submit coordinate




export function addClass(className, id){
   var el = document.getElementById(id)
   el.classList.add(className)
}

export function removeClass(className, id){
   var el = document.getElementById(id)
  el.classList.remove(className)
}


export function submitPlayerCoordinate(coordinates){
  return function(dispatch){
    return new Promise(function(resolve, reject){
      fetch('/api/setShips',{
        method: 'put',
        body: JSON.stringify(coordinates),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if(response.status >= 400){
          reject(new Error('Bad response from server!'))
        }
        response.json().then((body)=>{
          console.log(body)
          resolve(JSON.parse(body))
        })
      })
    })
  }
}

// submitMissile
//
// fetch('/api/missile',{
//   method: 'POST',
//   body: JSON.stringify(info),
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   }
// }).then(response =>
// response.json()).then(result => {
//   this.setState({
//     cpuSelectedCoordinate: result.response
//   })
//   this.checkPlayerSuccess(result)
// })
