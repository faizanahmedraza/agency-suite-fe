const PascalCase = (str) => {
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    } 
    return arr.join(" ");
}

const GeneralHelper = {
    PascalCase,
};

export default GeneralHelper;