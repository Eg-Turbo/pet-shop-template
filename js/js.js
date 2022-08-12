let cartIcon = document.querySelector("nav .btn")
let prodItems = document.querySelectorAll(".prod")
let prodCart = document.querySelectorAll(".prod .icons .icon:first-child")
let prodLove = document.querySelectorAll(".prod .icons .icon:nth-child(2)")
let prodSee = document.querySelectorAll(".prod .icons .icon:nth-child(3)")
let products = document.querySelectorAll(".prod")
let x = document.querySelector(":root")
let list = document.querySelector("ul.items-list")
let y = getComputedStyle(x)
prodItems.forEach((e,ind)=>{
    e.setAttribute("data-num",`${ind}`)
    prodCart[ind].setAttribute("data-num",`${ind}`)
    prodLove[ind].setAttribute("data-num",`${ind}`)
    prodSee[ind].setAttribute("data-num",`${ind}`)
})
function getFromLocalForLove (productItems,localKey) {
    let activeStatus = []
    if(localStorage.getItem(localKey)!==null &&localStorage.getItem(localKey)!=="") {
        activeStatus = localStorage.getItem(localKey).split(",").map(e=>+e)
        activeStatus.forEach(ele=>{
            productItems.forEach(el=>{
                if(+el.getAttribute("data-num")==ele){
                    productItems[ele].classList.add("active-icon")
                }
            prodItems.forEach(el=>{
                if(+el.getAttribute("data-num")==ele){
                    prodItems[ele].classList.add("order-first")
                }
            })
            
            })
        })
    } else {
        activeStatus = []
    }
    productItems.forEach((ele)=>{
        ele.addEventListener("click",()=>{
            ele.classList.toggle("active-icon")
            if(ele.classList.contains("active-icon")){
                activeStatus.push(+ele.getAttribute("data-num"))
                localStorage.setItem(localKey,activeStatus)
            }else {
                prodItems.forEach(el=>{
                    if(+el.getAttribute("data-num")==ele.getAttribute("data-num")){
                        prodItems[ele.getAttribute("data-num")].classList.remove("order-first")
                    }
                })
                activeStatus.splice(activeStatus.indexOf(+ele.getAttribute("data-num")),1)
                localStorage.setItem(localKey,activeStatus)
            }
        })
    })
}
function getFromLocalForSee (productItems,localKey) {
    let activeStatus = []
    if(localStorage.getItem(localKey)!==null &&localStorage.getItem(localKey)!=="") {
        activeStatus = localStorage.getItem(localKey).split(",").map(e=>+e)
        activeStatus.forEach(ele=>{
            productItems.forEach(el=>{
                if(+el.getAttribute("data-num")==ele){
                    productItems[ele].classList.add("active-icon")
                }
            })
        })
    } else {
        activeStatus = []
    }
    productItems.forEach((ele)=>{
        ele.addEventListener("click",()=>{
            
            ele.classList.toggle("active-icon")
            if(ele.classList.contains("active-icon")){
                activeStatus.push(+ele.getAttribute("data-num"))
                localStorage.setItem(localKey,activeStatus)
            }else {
                console.log(activeStatus);
                activeStatus.splice(activeStatus.indexOf(+ele.getAttribute("data-num")),1)
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
    iconsArray.forEach((ele)=>{
        ele.addEventListener("click",()=>{
            if(ele.classList.contains("active-icon")==true) {
                if(cartIcon.classList.contains("flash")) {
                    cartIcon.classList.remove("flash")
                    cartIcon.classList.add("flash-1")
                    return
                }else if(cartIcon.classList.contains("flash-1")){
                    cartIcon.classList.remove("flash-1")
                    cartIcon.classList.add("flash")
                    return
                }
                cartIcon.classList.add("flash")
                return;
            }
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
            let emptyP = document.createElement("p")
            li.classList.add("row", "align-items-center","pe-2")
            divCont.classList.add("content", "d-flex" ,"col-10", "justify-content-start", "align-items-center")
            divimg.classList.add("img","me-3")
            img.classList.add("img-fluid")
            divText.classList.add("text")
            p1.classList.add("mb-1")
            p2.classList.add("mb-1")
            btn.classList.add("delete","me-1","keep-open")
            icon.classList.add("fa-solid","fa-trash",)
            divBtn.classList.add("close-btn","col-2","text-end")
            emptyP.classList.add("fs-3","text-center")
            li.setAttribute("data-num",`${ele.getAttribute("data-num")}`)
            p1.innerHTML = `${products[ele.getAttribute("data-num")].children[1].innerHTML}`
            p2.innerHTML = `${products[ele.getAttribute("data-num")].children[2].innerHTML}`
            divText.appendChild(p1)
            divText.appendChild(p2)
            divimg.appendChild(img)
            divCont.appendChild(divimg)
            divCont.appendChild(divText)
            li.appendChild(divCont)
            btn.appendChild(icon)
            divBtn.appendChild(btn)
            li.appendChild(divBtn)
            emptyP.innerHTML="No Items Found"
            img.src=`image/product_0${+ele.getAttribute("data-num")+1}.jpg`
            let items = document.querySelectorAll("ul.items-list li")
            btn.addEventListener("click",(e)=>{
                activeStatus = localStorage.getItem("activeCart").split(",").map(e=>+e)
                activeStatus.splice(activeStatus.indexOf(+li.getAttribute("data-num")),1)
                localStorage.setItem("activeCart",activeStatus)
                prodItems.forEach((e)=>{
                    if(e.getAttribute("data-num")==li.getAttribute("data-num")) 
                    e.children[0].children[0].children[0].classList.remove("active-icon") ;
                })
                li.remove()
                let items = document.querySelectorAll("ul.items-list li")
                if(items.length == 0) list.appendChild(emptyP)
                changeCartNum() 
                e.stopPropagation()
            })
            if(items.length==0) {list.innerHTML= ``
            list.appendChild(li)
            }
            else list.appendChild(li)
            changeCartNum() 
        })
    })
}
function cartActiveState (productItems,localKey){
    let activeStatus = []
    
    if(localStorage.getItem(localKey)!==null &&localStorage.getItem(localKey)!=="") {
        activeStatus = localStorage.getItem(localKey).split(",").map(e=>+e)
        activeStatus.forEach((ele,ind)=>{
            if(ind==0) list.innerHTML= ``
            productItems[ele].classList.add("active-icon")
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
            let emptyP = document.createElement("p")
            li.classList.add("row", "align-items-center","pe-2")
            divCont.classList.add("content", "d-flex" ,"col-10", "justify-content-start", "align-items-center")
            divimg.classList.add("img","me-3")
            img.classList.add("img-fluid")
            divText.classList.add("text")
            p1.classList.add("mb-1")
            p2.classList.add("mb-1")
            btn.classList.add("delete","me-1","keep-open")
            icon.classList.add("fa-solid","fa-trash",)
            divBtn.classList.add("close-btn","col-2","text-end")
            emptyP.classList.add("fs-3","text-center")
            li.setAttribute("data-num",`${ele}`)
            p1.innerHTML = `${products[ele].children[1].innerHTML}`
            p2.innerHTML = `${products[ele].children[2].innerHTML}`
            divText.appendChild(p1)
            divText.appendChild(p2)
            divimg.appendChild(img)
            divCont.appendChild(divimg)
            divCont.appendChild(divText)
            li.appendChild(divCont)
            btn.appendChild(icon)
            divBtn.appendChild(btn)
            li.appendChild(divBtn)
            emptyP.innerHTML="No Items Found"
            img.src=`image/product_0${+ele+1}.jpg`
            btn.addEventListener("click",(e)=>{
                activeStatus = localStorage.getItem("activeCart").split(",").map(e=>+e)
                activeStatus.splice(activeStatus.indexOf(+li.getAttribute("data-num")),1)
                localStorage.setItem("activeCart",activeStatus)
                prodItems.forEach((e)=>{
                    if(e.getAttribute("data-num")==li.getAttribute("data-num")) 
                    e.children[0].children[0].children[0].classList.remove("active-icon") ;
                })
                li.remove()
                let items = document.querySelectorAll("ul.items-list li")
                if(items.length == 0) list.appendChild(emptyP)
                changeCartNum() 
                e.stopPropagation()
            })
            list.appendChild(li)
            changeCartNum() 

        })
    } else {
        activeStatus = []
    }
    productItems.forEach((ele)=>{
        ele.addEventListener("click",()=>{
            if(ele.classList.contains("active-icon")==false){
                ele.classList.add("active-icon")
                activeStatus.push(ele.getAttribute("data-num"))
                localStorage.setItem(localKey,activeStatus)
            }
        })
    })
}
addToCartList(prodCart)
cartActiveState(prodCart,"activeCart")
changeCartNum()
getFromLocalForLove(prodLove,"activeLove")
getFromLocalForSee(prodSee,"activeSee")


