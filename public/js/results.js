const dropdown = document.getElementsByClassName('dropdown');
const big5Traits = document.getElementsByClassName('big5-trait');
const iTag = document.getElementsByTagName('i');


for(let i = 0; i < dropdown.length; ++i) {
    dropdown[i].addEventListener('click', () => {
        let big5Trait = big5Traits[i];

        for(let j = 0; j < big5Trait.children.length; ++j) {
            if(big5Trait.children[j].classList.contains('sub-trait')) {
                big5Trait.children[j].classList.toggle("hide");
            }
        }

        if(iTag[i].classList.contains('fa-angle-down')) {
            iTag[i].classList.remove('fa-angle-down');
            iTag[i].classList.add('fa-angle-up');
        }
        else {
            iTag[i].classList.remove('fa-angle-up');
            iTag[i].classList.add('fa-angle-down');
        }
    })
}