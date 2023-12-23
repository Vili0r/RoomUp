import React, { useState, useMemo } from "react";
import { VscListSelection } from "react-icons/vsc";
import { FiMapPin } from "react-icons/fi";
import { Link } from "@inertiajs/react";
import Map, {
    Marker,
    Popup,
    FullscreenControl,
    NavigationControl,
} from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";

const MapCard = ({ toggleMap, setToggleMap, listings }) => {
    const [popupInfo, setPopupInfo] = useState(null);
    const coordinates = listings.map((listing) => ({
        longitude: listing.owner
            ? listing.owner.address.long
            : listing.address.long,
        latitude: listing.owner
            ? listing.owner.address.lat
            : listing.address.lat,
    }));
    const center = getCenter(coordinates);

    const marker = useMemo(
        () =>
            listings.map((listing, index) => (
                <Marker
                    key={`marker-${index}-${listing.long}`}
                    longitude={
                        listing.owner
                            ? listing.owner.address.long
                            : listing.address.long
                    }
                    latitude={
                        listing.owner
                            ? listing.owner.address.lat
                            : listing.address.lat
                    }
                    offsetLeft={-20}
                    offsetTop={-10}
                    anchor="bottom"
                    onClick={(e) => {
                        e.originalEvent.stopPropagation();
                        setPopupInfo(listing);
                    }}
                >
                    <p
                        role="img"
                        aria-label="push-pin"
                        className="text-2xl text-white cursor-pointer animate-bounce"
                    >
                        <FiMapPin size={24} />
                    </p>
                </Marker>
            )),
        [listings]
    );
    return (
        <div
            className={
                toggleMap
                    ? "fixed top-0 left-0 w-[100%] z-[100] h-[100%]"
                    : "px-2 rounded-xl col-span-2 sticky top-[5.5rem] [@media(max-width:1023px)]:hidden h-[600px]"
            }
        >
            <Map
                mapLib={import("mapbox-gl")}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                    longitude: center.longitude,
                    latitude: center.latitude,
                    zoom: 8,
                }}
                mapStyle="mapbox://styles/tsouvili/clqgg9eeb00ii01o974j8ge9v"
            >
                {toggleMap && <FullscreenControl position="top-left" />}
                <NavigationControl position="top-left" />
                {marker}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.long)}
                        latitude={Number(
                            popupInfo.owner
                                ? popupInfo.owner.address.lat
                                : popupInfo.address.lat
                        )}
                        onClose={() => setPopupInfo(null)}
                    >
                        <Link
                            href={route("property.show", [
                                popupInfo.model,
                                popupInfo.id,
                            ])}
                        >
                            <div>
                                {popupInfo.owner
                                    ? popupInfo.owner.title
                                    : popupInfo.title}{" "}
                                -{" "}
                                <strong>
                                    £
                                    {popupInfo.owner
                                        ? popupInfo.room_cost
                                        : popupInfo.cost}
                                    / month
                                </strong>
                            </div>
                        </Link>
                    </Popup>
                )}
            </Map>
            {toggleMap && (
                <div
                    className="fixed bottom-[4rem] left-[44%]"
                    style={{ transition: ".4s" }}
                >
                    <button
                        onClick={() => setToggleMap(false)}
                        className="fixed flex justify-center gap-2 p-3 py-3 text-sm font-semibold text-white bg-gray-800 rounded-full font-popp"
                    >
                        Show List
                        <VscListSelection className="mt-[3px]" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapCard;
