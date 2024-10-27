document.getElementById("submit").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    let price = Number(document.getElementById("startingBid").value);

    if (!name || !price) {
        document.getElementById("result").textContent = "Please enter both name and starting bid.";
        return;
    }

    price *= Number(document.getElementById("education").value);
    price *= Number(document.getElementById("networth").value);

    const ageRadios = Array.from(document.getElementsByName("age"));
    ageRadios.forEach(radio => {
        if (radio.checked) {
            price *= Number(radio.value);
        }
    });

    price += Number(document.getElementById("caste").value);

    const skills = Array.from(document.getElementsByClassName("skills"));
    const skillBonus = skills.filter(skill => skill.checked).reduce((sum, skill) => sum + Number(skill.value), 0);
    price += skillBonus;

    const reputation = Array.from(document.getElementsByClassName("reputation"));
    for (let i = 0; i < reputation.length; i++) {
        if (reputation[i].checked) {
            const repValue = Number(reputation[i].value);
            if (repValue > 0) {
                price *= repValue;
            } else {
                price += repValue;
            }
        }
    }

    const loveLetter = document.getElementById("loveLetter").value;
    const person = {
        bride_name: name,
        bride_price: price.toFixed(2),
        letter_to_bride: loveLetter
    };

    document.getElementById("result").textContent = `Your price for ${person.bride_name} is $${person.bride_price}. Love letter: ${person.letter_to_bride}`;
});
