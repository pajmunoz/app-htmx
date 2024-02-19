export default function List({ title, bg, endpoint, onItemClick, widthFloatingDiv }) {

    const handleItemClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        onItemClick({ x: rect.left - 112, y: rect.top });
    };
    return (
        <>
            <p>{title}</p>
            <ul className={bg}>
                {endpoint.map((item, index) => (
                    <li key={index}><span onClick={handleItemClick}
                    >{'<'} {item} </span> 
                    </li>
                ))}

            </ul>
        </>
    )
}
