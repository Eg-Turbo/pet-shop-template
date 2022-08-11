let prodCart = document.querySelectorAll(".prod .icons .icon:first-child")
let prodLove = document.querySelectorAll(".prod .icons .icon:nth-child(2)")
let prodSee = document.querySelectorAll(".prod .icons .icon:nth-child(3)")
let products = document.querySelectorAll(".prod")
let x = document.querySelector(":root")
let list = document.querySelector("ul.items-list")
let y = getComputedStyle(x)
function getFromLocal (productItems,localKey) {
    let activeStatus = []
    if(localStorage.getItem(localKey)!==null) {
        activeStatus = localStorage.getItem(localKey).split(",").map(e=>+e)
        activeStatus.forEach(ele=>{
            productItems[ele].classList.add("active-icon")
        })
    } else {
        activeStatus = []
    }
    productItems.forEach((ele,ind)=>{
        ele.addEventListener("click",()=>{
            ele.classList.toggle("active-icon")
            if(ele.classList.contains("active-icon")){
                activeStatus.push(ind)
                localStorage.setItem(localKey,activeStatus)
            }else {
                activeStatus.splice(activeStatus.indexOf(ind),1)
                localStorage.setItem(localKey,activeStatus)
            }
        })
    })
}
function changeCartNum () {
    let items = document.querySelectorAll("ul.items-list li")
    x.style.setProperty("--cart-num",`"${items.length}"`)
}
function addToCartList (iconsArray) {
    iconsArray.forEach((ele,ind)=>{
        ele.addEventListener("click",()=>{
            let li = document.createElement("li")
            let divCont = document.createElement("div")
            let divimg = document.createElement("div")
            let divText = document.createElement("div")
            let img = document.createElement("img")
            let p1 = document.createElement("p")
            let p2 = document.createElement("p")
            let divBtn = document.createElement("div")
            let btn = document.createElement("button")
            let icon = document.createElement("i")
            li.classList.add("row", "align-items-center")
            divCont.classList.add("content", "d-flex" ,"col-10", "justify-content-start", "align-items-center")
            divimg.classList.add("img","me-4")
            img.classList.add("img-fluid")
            divText.classList.add("text")
            p1.classList.add("mb-1")
            p2.classList.add("mb-1")
            btn.classList.add("delete")
            icon.classList.add("fa-solid","fa-trash",)
            divBtn.classList.add("close-btn","col-2","text-end")
            p1.innerHTML = `${products[ind].children[1].innerHTML}`
            p2.innerHTML = `${products[ind].children[2].innerHTML}`
            divText.appendChild(p1)
            divText.appendChild(p2)
            img.src=`image/product_0${ind+1}.jpg`
            divimg.appendChild(img)
            divCont.appendChild(divimg)
            divCont.appendChild(divText)
            li.appendChild(divCont)
            btn.appendChild(icon)
            divBtn.appendChild(btn)
            li.appendChild(divBtn)
            btn.addEventListener("click",()=>{
                li.remove()
                changeCartNum() 
            })
            list.appendChild(li)
            changeCartNum() 
            console.log(divCont);
        })
    })
}
addToCartList(prodCart)
changeCartNum()
getFromLocal(prodCart,"activeCart")
getFromLocal(prodLove,"activeLove")
getFromLocal(prodSee,"activeSee")


