import ClipLoader from "react-spinners/ClipLoader"
export default function CLoading() {
    const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-color');
    return (
        <ClipLoader color={primaryColor}/>
    );
}