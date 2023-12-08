import { Title } from "../components/Title"
import './MapPage.css'

export const MapPage = () => {
  return (
    <>
    <div className="map-container">
    <Title title='A Map of Days' />
      <div className="map-text">
        <p id="map-subtitle">Explore Peculiardom</p>
        <p>Each icon represents a loop at that approximate location. Click the icon to learn more about the loop, including its date, keeper, and brief description.</p>
      </div>
    </div>
    </>
  )
}