
//login function
function login(){
    
    document.getElementById('get-started-btn').addEventListener('click',
        (event) => {

            event.preventDefault();

            const userName = document.getElementById('user-name');
            const password = document.getElementById('user-password');
            console.log(userName.value,password.value);

            if(!userName.value){

                Swal.fire({
                    title: "Invalid Username!",
                    text: "The username you entered is invalid. Please try again.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                    customClass: {
                        popup: 'small-modal'
                    }
                });

            }
            else if(password.value !== "123456"){

                Swal.fire({
                    title: "Wrong Password!",
                    text: "Please check your password and try again.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                    customClass: {
                        popup: 'small-modal'
                    }
                });

            }
            else{


                //after successful lagin show 
                document.getElementById('header-section').classList.remove('hidden');
                document.getElementById('learn-vocabulary-section').classList.remove('hidden');
                document.getElementById('faqSection').classList.remove('hidden');

                //hide banner
                document.getElementById('banner').classList.add('hidden');

                Swal.fire({
                    title: "Login Completed",
                    text: "Explore our contents",
                    icon: "success",
                    customClass: {
                        popup: 'small-modal'
                    }
                });

                userName.value = '';
                password.value = '';

            }
           
        }
    );

 
    
}


//logout function 

function logout(){
    document.getElementById('logout-btn').addEventListener('click', () => {
        console.log("logout btn");

        document.getElementById('header-section').classList.add('hidden');
        document.getElementById('learn-vocabulary-section').classList.add('hidden');
        document.getElementById('faqSection').classList.add('hidden');


        document.getElementById('banner').classList.remove('hidden');
    });
}



//fetching

//fetching all levels 
async function getAllLevels(){

    // await fetch('https://openapi.programming-hero.com/api/levels/all')
    // .then(response => response.json())
    // .then (data => {
    //     return data;
    // })
    // .catch(error => console.log('Error is :',error));
    
    //return hoy na 

    try {
        const response = await fetch('https://openapi.programming-hero.com/api/levels/all');

      

        const data = await response.json();
        return data;

    }

    catch {
        console.log('Error is :',error);
    }

}

 



// get words by level 

async function getWordsByLevel(level_no){

    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/level/${level_no}`);

        const data = await response.json();
        return data;

    }

    catch {
        console.log('Error is :',error);
    }


}






//get word details by id 


async function getWordDetailsById(id) {



    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);

        const data = await response.json();
        return data;

    }

    catch {
        console.log('Error is :',error);
    }

}


// getWordDetailsById(5);





// get all Words 


async function getAllWords(){

  

    try {
        const response = await fetch('https://openapi.programming-hero.com/api/words/all');

        const data = await response.json();
        return data;

    }

    catch {
        console.log('Error is :',error);
    }


}


// getAllWords();


//others functions 


// navigate to section after clicking a buttion

function  navigateToSection(buttonId , sectionId){
    document.getElementById(sectionId).classList.add('scroll-mt-20','xl:scroll-mt-36');
    document.getElementById(buttonId).addEventListener('click', 
        () => {
            
            document.getElementById(sectionId).scrollIntoView({behavior : "smooth"});
        }
    );

}



//lesson button function + load data after clicking the button

async function addLessonButtonAddData (){
    let allLevelData = await getAllLevels()
    
    // console.log(allLevelData.data[0].level_no);
   
    
    let lessonBtnParrentDiv = document.getElementById('lesson-btn');
   
    //add the buttons 

    for(let i=0 ; i<allLevelData.data.length;i++){
        
        let buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
                    <div class="">
                            
                            <div id="${allLevelData.data[i].level_no}"  onclick="changeColor(${allLevelData.data[i].level_no})" class="lesson-btn-data  cursor-pointer hover:bg-[#422AD5]  border-2 border-[#422AD5] text-[11px] md:text-[16px]  xl:text-lg text-[#422AD5] hover:text-white  flex justify-center items-center  gap-2 px-2 py-2 mx-auto rounded-lg">
                                <p><i class="fa-solid fa-book-open"></i></p>
    
                                <p>${allLevelData.data[i].lessonName}</p>
                            </div>
    
                           
    
                    </div>` ;
        
        lessonBtnParrentDiv.appendChild(buttonDiv);
    
    }




    //load the data after clicking the button

    const buttonsToClick = document.getElementsByClassName('lesson-btn-data');
    Array.from(buttonsToClick).forEach(element => {
        element.addEventListener('click', async() => {
            //spinner animation 
            const spinnerContainer = document.getElementById('spinnerContainer');
            spinnerContainer.classList.remove('hidden');
            spinnerContainer.classList.add('flex');

            //fetching data outside because it is a async fetching
            //i dont know how to work it inside a setTimeout
            let dataBylevel =await getWordsByLevel(element.id);


            //word card parrent div 

            let wordCardParentDiv = document.getElementById('word-card-section');
            wordCardParentDiv.innerHTML = '';


            //2 sec animation then data load

            setTimeout(() => {

                spinnerContainer.classList.add('hidden');
                spinnerContainer.classList.remove('flex');

                // console.log(element.id);

                //select a lesson alert card
                let selectALesson = document.getElementById('plz-select-a-lesson-section');
                selectALesson.classList.add('hidden');

      

                if(dataBylevel.data.length>0){

                    document.getElementById('no-data-go-next-lesson').classList.add('hidden');

                

                    for(let i=0; i<dataBylevel.data.length;i++) {

                        // console.log(dataBylevel.data[i].word);


                        //data error handling
                        let wordCardDiv = document.createElement('div');

                        let WordMeaning = dataBylevel.data[i].meaning;
                        // console.log(Word);
                        if(WordMeaning === null || WordMeaning === undefined){
                            WordMeaning = "অর্থ নাই"
                        } 


                        let wordPronanciation = dataBylevel.data[i].pronunciation;

                        if(wordPronanciation === null || wordPronanciation === undefined){
                            wordPronanciation = "Pronanciation নাই";
                        }

                        wordCardDiv.classList.add('p-8');

                        wordCardDiv.innerHTML = `
                            
                            <div class="grid p-10 bg-white rounded-lg">

                                <p class="text-4xl font-bold text-black text-center">${dataBylevel.data[i].word}</p>
                                <p class="text-lg text-black text-center">Meaning /Pronounciation</p>
                                <p class="text-2xl noto-sans-bengali text-center">"${WordMeaning} / ${wordPronanciation}"</p>


                                <div class="flex justify-between mt-12">
                                    <p onclick="detailsOfWordModal(${dataBylevel.data[i].id})" class=" cursor-pointer text-3xl w-14 py-2 rounded-lg text-center bg-[rgba(26,145,255,0.1)]"><i class="fa-solid fa-exclamation"></i></p>
                                    <p onclick="speakTheWord('${dataBylevel.data[i].word}')" class=" cursor-pointer text-3xl w-14 py-2 rounded-lg text-center bg-[rgba(26,145,255,0.1)]"><i class="fa-solid fa-volume-high"></i></p>
                                </div>


                            </div>

                        `;

                        wordCardParentDiv.appendChild(wordCardDiv);

                    }


                }



                else{
                    //no data then show no data card 
                    document.getElementById('no-data-go-next-lesson').classList.remove('hidden');
                }

            }, 1200);




        });
    });





   
}


//change the button color after clicking 

let previouslySelectedBtn = null ; //initially
function changeColor(id){

    if(previouslySelectedBtn){
        previouslySelectedBtn.classList.remove('bg-[#422AD5]','text-white');
    }
    let getbtn =  document.getElementById(id);
    getbtn.classList.add('bg-[#422AD5]','text-white');
    previouslySelectedBtn = getbtn;
}




//details of the card
//modal 

async function detailsOfWordModal(id) {
    
    //fetch the data 
    const getWordsById = await getWordDetailsById(id);
    // console.log(getWordsById.data.synonyms);
    

    const getParrentDiv = document.getElementById('modal-section-id');
    getParrentDiv.classList.add('p-8');
    getParrentDiv.innerHTML='';
    // console.log(getParrentDiv);

    let modalWordMeaning =  getWordsById.data.meaning;
    if(modalWordMeaning === null || modalWordMeaning === undefined) {
        modalWordMeaning = "অর্থ নাই";
    }

    let modalWordPronanciation = getWordsById.data.pronunciation;
    if(modalWordPronanciation === null || modalWordPronanciation === undefined) {
        modalWordPronanciation = "Pronanciation নাই";
    }

    let modalWordSentence = getWordsById.data.sentence;
    if(modalWordSentence === null || modalWordSentence === undefined){
        modalWordSentence = "Sentence not found";
    }

    

    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = `
    <div id="modal" class="fixed  inset-0 z-50 flex items-center justify-center ">
        <div class="bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-96 relative">
            
            <div class="">
                <div class="text-black font-bold text-2xl flex items-center">
                    <p>${getWordsById.data.word} ( </p>
                    <p class="mx-1"><img class="w-5" src="assets/translationIcon.png" alt=""></p>
                    <p class="noto-sans-bengali"> ${modalWordPronanciation})</p>
                </div>


                <p class="mt-4 font-bold text-lg">Meaning</p>
                <p class="mt-1 text-sm noto-sans-bengali font-medium">${modalWordMeaning}</p>


                <p class="mt-4 font-bold text-lg">Example</p>
                <p class="mt-1 text-sm font-medium">${modalWordSentence}</p>
                
                
                <p class="mt-4 font-bold noto-sans-bengali text-sm">সমার্থক শব্দ গুলো</p>

                <div id="modal-synonyms-container" class="mt-2 grid grid-cols-3 text-center items-center gap-2">
                     
                      <!-- modal synonyms from api  -->

                </div>

            </div>

            <button id="closeModal" class="mt-4 bg-[#422AD5] text-white px-4 py-2 rounded">
                Complete Learning
            </button>
        </div>
    </div>

    `;

    getParrentDiv.appendChild(modalDiv);


    const  modalSynonymContainer = document.getElementById('modal-synonyms-container');
    // console.log(modalSynonymContainer);

    for(let i=0;i<getWordsById.data.synonyms.length;i++){
        // console.log(getWordsById.data.synonyms[i]);
        if(getWordsById.data.synonyms[i] !== null && getWordsById.data.synonyms[i] !== undefined){

            const synonymsP = document.createElement('p');
            synonymsP.innerText = getWordsById.data.synonyms[i];
            synonymsP.classList.add('bg-[#EDF7FF]', 'border-2', 'rounded-md', 'px-3', 'border-gray-300');
            modalSynonymContainer.appendChild(synonymsP);

        }

    }





    const modal = document.getElementById('modal');
    // console.log(modal);

    const closeModalBtn = document.getElementById('closeModal');
    // console.log(closeModalBtn);
    closeModalBtn.addEventListener('click', () => {
        // console.log('close btn clicked');
        modal.classList.add('hidden');
    });

    

}




//speak the word 
function speakTheWord(word){
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English word
    window.speechSynthesis.speak(utterance);
}



















