import React, {useEffect} from 'react';
import './Card.css';
import Badge from "../Badge/Badge";
import Position from "../Position/Position";



const Card = ({ant, i, status, selected, onSelect, onFinished}) => {

  useEffect(() => {
    if ((status === 'Complete' && selected.name === ant.name && !selected.position)) {
      onFinished(i+1);
    }
  });

  return (
    <div onClick={onSelect} className={status === 'Not Checked' ? "Card-card" : 'Card-card-alt'} style={{boxShadow: (selected.name !== null && selected.name === ant.name) ? 'green 0px 0px 4px 3px' : '0 0 14px -10px rgba(0,0,0,0.5)'}}>
      <Badge status={ant.status}/>
      {
        status === 'Complete' ? (
        <Position i={i}/>
        ) : null
      }
      <svg xmlns="http://www.w3.org/2000/svg" version="1" width="128" height="128">
        <defs>
          <linearGradient id="a">
            <stop offset="0" stopColor="#fff"/>
            <stop offset="1" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path fill={ant.color.toLowerCase()} d="M17.177 23.93c-1.026.842 7.226 11.286 7.735 11.894 7.05 8.436 14.03 8.726 14.892 9.985.87 1.251 5.028 5.437 12.424 6.668.028 1.923.134 3.74.332 5.466-4.546-1.252-9.666-2.327-12.53-2.32-3.019-.007-13.244 2.85-15.075 3.706-.644.304-12.325.007-12.325 1.28 0 1.286 11.632 1.76 12.113 1.11 4.221.671 16.178-1.514 17.451-1.287 1.273.24 11.066 3.09 11.137 3.104.735 3.38 1.803 5.225 3.069 7.481-4.865-.141-13.598 4.674-18.47 9.546-4.044 4.045-10.783 10.585-11.801 12.028-3.805 5.374-2.1 22.182.007 22.182 1.654 0-2.306-15.047 1.499-20.421 1.096-1.549 13.35-9.914 14.778-11.555 1.429-1.64 9.023-3.988 12.205-6.364-3.203 2.072-5.395 5.31-5.395 9.766 0 16.546 8.633 23.214 15.118 23.292 0 0 .007.02.02.02l.043.001H64.49c6.477-.085 15.069-6.767 15.069-23.285.007-4.15-1.91-7.27-4.752-9.348 3.458 2.213 10.239 4.384 11.582 5.926 1.436 1.633 13.633 9.998 14.736 11.554 3.812 5.367-.141 20.435 1.528 20.435 2.093 0 3.804-16.815 0-22.189-1.026-1.435-7.757-7.97-11.802-12.014-4.879-4.879-13.598-9.694-18.47-9.546 1.266-2.255 2.327-4.15 3.07-7.537.063-.008 9.856-2.815 11.136-3.048 1.28-.233 13.23 1.959 17.459 1.28.473.657 12.112.177 12.105-1.103.007-1.28-11.71-1.004-12.353-1.308-1.824-.863-12-3.713-15.026-3.713-2.864.007-8.025 1.082-12.572 2.32.198-1.712.346-3.529.375-5.452 7.396-1.245 11.56-5.424 12.416-6.675.87-1.252 7.85-1.542 14.9-9.992.501-.6 8.76-11.052 7.728-11.886-1.21-.983-8.775 8.76-9.08 9.616-2.05 1.019-11.794 7.51-12.968 7.977-1.18.46-7.12 2.58-13.435 6.364-.969-3.699-3.408-6.209-6.392-7.538 4.122-.007 7.12-.813 7.12-5.353 0-4.964-.954-9.539-2.56-13.209 4.392-2.284 7.574-4.73 8.528-5.077.955-.36 1.323-1.676-.487-4.999-2.984-5.459-6.216-10.19-6.916-9.928-.7.276 2.567 10.91 5.367 13.202-3.316.587-5.494 1.662-8.259 3.578-2.178-3.295-4.978-5.275-8.068-5.325-.007-.007-.014-.028-.021-.02-.029 0-.064-.008-.092-.008-3.097.042-5.954 2.05-8.125 5.353-2.772-1.91-4.935-3.012-8.245-3.606 2.8-2.277 6.088-12.905 5.388-13.167-.7-.261-3.952 4.434-6.936 9.893-1.818 3.33-1.422 4.674-.467 5.02.962.354 4.144 2.8 8.535 5.084-1.612 3.663-2.567 8.252-2.567 13.216 0 4.526 2.998 5.346 7.113 5.346-2.976 1.336-5.416 3.846-6.385 7.53-6.314-3.783-12.282-5.876-13.456-6.342-1.18-.46-10.918-7-12.968-8.019-.297-.848-7.85-10.578-9.065-9.588z"/>
      </svg>
      <h4 className="Card-ant-name">
        {ant.name}
      </h4>
      <div className="Card-information">
        <div className="Card-information-header">
          <span className="Card-unit-header">Color</span>
          <span className="Card-unit-header">Weight <span className="Card-unit">mg</span></span>
          <span className="Card-unit-header">Length <span className="Card-unit">mm</span></span>
        </div>
        <div className="Card-information-content">
          <span className="Card-stat">{ant.color.charAt(0) + ant.color.toLowerCase().slice(1)}</span>
          <span className="Card-stat">{ant.weight}</span>
          <span className="Card-stat">{ant.length}</span>
        </div>
        {ant.status === 'Complete' ? (<span className="Card-estimation"><b>Estimated Time:</b> {ant.estimation.toFixed(4)} <span className="Card-time-unit">secs</span></span>) : null}
      </div>
    </div>
  );
};

export default Card;
