import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loading } from '../store/LoaderReducer';
import { addAuction, getAuction } from '../api/auction';
import { parseFile } from '../utils/parseData';
import { dateFormat } from '../static/variables';
import dayjs from 'dayjs';

export function useAuction() {
  const [auction, setAuction] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const fetchAuction = async id => {
    dispatch(loading());

    try {
      const response = await getAuction(id);
      const {
        title,
        description,
        startPrice,
        step,
        startDate,
        endDate,
        images,
        video,
      } = response.data;
      setAuction({
        title,
        description,
        initialRate: startPrice,
        stepRate: step,
        rangeDate: [
            dayjs(startDate, dateFormat),
            dayjs(endDate, dateFormat),
          ],
        images: parseFile(images),
        video: parseFile(video),
      });
    } catch (err) {
      setError(err);
    } finally {
      dispatch(loading());
    }
  };

  useEffect(() => {
    const { id } = params;
    fetchAuction(id);
  },[]);

  const createAuction = async auction => {
    dispatch(loading());

    try {
      await addAuction(auction);
    } catch (err) {
      setError(err);
    } finally {
      dispatch(loading());
    }
  };

  return { auction, error, createAuction };
}
