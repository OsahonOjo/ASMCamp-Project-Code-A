
export default function TopicItemSuccessModal() {

    const MODAL_TEXT = "Success!";
    const NEXT_TEXT = "Next";

    function closeModal() {
        document.getElementById('modal').style.display = "none";
    }

    function openModal() {
        document.getElementById('modal').style.display = "block";
    }

    return (
        <div id={"modal"}>
            <span onClick={closeModal}>&times;</span>
            <div>
                <h2>{MODAL_TEXT}</h2>
                <div>
                    <button type="button">{NEXT_TEXT}</button>
                </div>
            </div>
        </div>
    );
}