// let arr = [10,20,30,40,50, 'hello', true, false, {a:1}, [1,2,3]]; 

// //indexing 
// let indexOne = arr[3];
// console.log(indexOne); //40

// //length
// let lengthOfArray = arr.length;
// console.log(lengthOfArray); 


cart=[{item:'apple', price : 1000},
{item:'milk', price : 2000},
{item:'bread', price : 3000},
{item:'eggs', price : 4000},
{item:'soap', price : 5000},
{item:'shampoo', price : 6000},
{item:'toothpaste', price : 7000},
{item:'rice', price : 8000},
{item:'pasta', price : 9000},
{item:'beans', price : 1111}
];

//adding 100 dollars to each item price
// for(let i=0; i<cart.length; i++){
//     console.log(cart[i].price += 100);
// }   
// cart.forEach(product => {
//     console.log(product.price += 100);
// });

let findX = cart.findIndex(product => {
    return product.item === 'rice'
});

console.log(findX); 

//filter
let filteredCart = cart.filter(product => {
    return product.price > 5000
}); 

console.log(filteredCart);

//reduce
let total = cart.reduce((total, product) => {
    return total + product.price
}, 0);

console.log(total);