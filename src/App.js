import { DataProvider } from './context/DataContext';
import {BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Accommodation from './pages/Accommodation';
import Experience from './pages/Experience';
import ExperienceDetail from './pages/ExperienceDetail';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Location from './pages/Location';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PoolVilla from './pages/PoolVilla';
import EventDetail from './pages/EventDetail';
import Err404 from './pages/Err404';
import Preview from './pages/Preview';
import PreviewEvent from './pages/PreviewEvent';
import Tags from './pages/Tags';

/*import DashHome from './pages/DashBoard/DashHome';*/
import DashRoom from './pages/DashBoard/DashRoom';
import DashExperience from './pages/DashBoard/DashExperience';
import DashGallery from './pages/DashBoard/DashGallery';
import DashEvents from './pages/DashBoard/DashEvents';
import DashPromotion from './pages/DashBoard/DashPromotion';
import DashCategory from './pages/DashBoard/DashCategory';
import DashWeb from './pages/DashBoard/DashWeb';
import DashRoomAdd from './pages/DashBoard/DashRoomAdd';
import DashRoomEdit from './pages/DashBoard/DashRoomEdit';
import DashExperienceAdd from './pages/DashBoard/DashExperienceAdd';
import DashExperienceEdit from './pages/DashBoard/DashExperienceEdit';
import DashGalleryAdd from './pages/DashBoard/DashGalleryAdd';
import DashGalleryEdit from './pages/DashBoard/DashGalleryEdit';
import DashEventsAdd from './pages/DashBoard/DashEventsAdd';
import DashEventsEdit from './pages/DashBoard/DashEventsEdit';
import DashPromotionAdd from './pages/DashBoard/DashPromotionAdd';
import DashPromotionEdit from './pages/DashBoard/DashPromotionEdit';
import DashCategoryAdd from './pages/DashBoard/DashCategoryAdd';
import DashWebAdd from './pages/DashBoard/DashWebAdd';
import DashWebEdit from './pages/DashBoard/DashWebEdit';
import DashContact from './pages/DashBoard/DashContact';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';



import 'photoswipe/dist/photoswipe.css'
import "./assets/styles.css";


function App() {
  
  return (<> 
           <DataProvider>
              
                <BrowserRouter>
                    <Routes>
                            <Route path="/" exact element={<Home />} />
                            <Route path="/accommodation"  element={<Accommodation />} />
                            <Route path="/accommodation/:slug/:id" element={<PoolVilla />} />
                            <Route path="/experience"  element={<Experience />} />
                            <Route path="/experience/:slug/:id"  element={<ExperienceDetail />} />
                            <Route path="/preview/:slug"  element={<Preview />} />
                            <Route path="/preview-events/:slug"  element={<PreviewEvent />} />
                            <Route path="/events"  element={<Events />} />
                            <Route path="/events/:slug/:id"  element={<EventDetail />} />
                            <Route path="/gallery"  element={<Gallery />} />
                            <Route path="/location"  element={<Location />} />
                            <Route path="/contact"  element={<Contact />} />
                            <Route path="/tags/:slug"  element={<Tags />} />
                            <Route path="/login"  element={<Login />} />

                            <Route path="/backend/"  element={<DashRoom />} />
                            <Route path="/backend/room"  element={<DashRoom />} />
                            <Route path="backend/room/add" element={<DashRoomAdd />} />
                            <Route path="backend/room/edit/:id" element={<DashRoomEdit />} />
                            <Route path="/backend/experience"  element={<DashExperience />} />
                            <Route path="backend/experience/add"  element={<DashExperienceAdd />} />
                            <Route path="backend/experience/edit/:id"  element={<DashExperienceEdit />} />
                            <Route path="/backend/gallery"  element={<DashGallery />} />
                            <Route path="backend/gallery/add"  element={<DashGalleryAdd />} />
                            <Route path="backend/gallery/edit/:id"  element={<DashGalleryEdit />} />
                          
                            <Route path="/backend/events"  element={<DashEvents />} />
                            <Route path="backend/events/add"  element={<DashEventsAdd />} />
                            <Route path="backend/events/edit/:id"  element={<DashEventsEdit />} />
                            <Route path="/backend/promotion"  element={<DashPromotion />} />
                            <Route path="backend/promotion/add"  element={<DashPromotionAdd />} />
                            <Route path="backend/promotion/edit/:id"  element={<DashPromotionEdit />} />

                            <Route path="/backend/category"  element={<DashCategory />} />
                            <Route path="backend/category/add"  element={<DashCategoryAdd />} />
                          
                            <Route path="/backend/web"  element={<DashWeb />} />
                            <Route path="backend/web/add/:title"  element={<DashWebAdd />} />
                            <Route path="backend/web/edit/:id"  element={<DashWebEdit />} />

                            <Route path="/backend/contact"  element={<DashContact />} />
                            

                            <Route path="*" element={<Err404 />} />
                      </Routes>
                  </BrowserRouter>
            </DataProvider>
          </>
  );
}

export default App;
