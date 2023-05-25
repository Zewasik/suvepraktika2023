import { PageParams } from "./main"

interface FilterProps {
    setPageParams: React.Dispatch<React.SetStateAction<PageParams>>
}

export default function Filter({ setPageParams }: FilterProps) {
    const handleFilterChange = (event: any) => {
        const selectedValue = event.target.value

        setPageParams((prevVal) => {
            const temp = Object.assign({}, prevVal)
            temp.filter = selectedValue !== "DEFAULT" ? selectedValue : null
            return temp
        })
    }

    return (
        <div className="main-page__filter">
            <label className="filter__label">Filter: </label>
            <select onChange={handleFilterChange} className="form__field filter">
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