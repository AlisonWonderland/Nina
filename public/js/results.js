const dropDownBtns = document.getElementsByClassName('drop-btn');
const big5Traits = document.getElementsByClassName('big5-trait');

for(let i = 0; i < dropDownBtns.length; ++i) {
    dropDownBtns[i].addEventListener('click', () => {
        let big5Trait = big5Traits[i];

        for(let j = 0; j < big5Trait.children.length; ++j) {
            if(big5Trait.children[j].classList.contains('trait-children')) {
                big5Trait.children[j].classList.toggle("hide");
            }
        }
    })
}