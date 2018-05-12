let numArr = [1, 2, 3, 4, 5];
let nums = [];

let promiseList = new Promise(function (resolve, reject) {
    setTimeout(() => {
        numArr.forEach((val) => {
            nums.push(val);
        });
        resolve(nums);
    }, 5000)
})


Promise.all([promiseList]).then((arrList) => {
    arrList.forEach((array) => {
        console.log("Array return from promiseList object ", array);
    })

});