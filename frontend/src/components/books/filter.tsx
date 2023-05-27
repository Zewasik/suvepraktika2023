import { NavigateFunction } from "react-router-dom"

interface FilterProps {
    navigate: NavigateFunction
}

export default function Filter({ navigate }: FilterProps) {

    return (
        <div className="main-page__filter">
            <label className="filter__label">Filter: </label>
            <select onChange={(event) => {
                const selectedValue = event.target.value

                const queryParams = new URLSearchParams(window.location.search)
                if (selectedValue !== "DEFAULT") {
                    queryParams.set("filter", selectedValue)
                } else {
                    queryParams.delete("filter")
                }

                queryParams.delete("page")

                navigate(`/books?${queryParams.toString()}`)
            }} className="form__field filter">
                <option value={"DEFAULT"}>Default</option>
                <option value={"AVALIABLE"}>Avaliable</option>
                <option value={"BORROWED"}>Borrowed</option>
                <option value={"RETURNED"}>Returned</option>
                <option value={"DAMAGED"}>Damaged</option>
                <option value={"PROCESSING"}>Processing</option>
            </select>
        </div>
    )
}