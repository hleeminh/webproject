import React, { useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Store } from '@/utils/Store';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ProductItem from '@/components/ProductItem';
import db from '@/utils/db';

const Search = () => {
  return (
    <div className='grid md:grid-cols-4 md:gap-5'>
      {/* 1 */}

      <div>
        <div className='my-3'>
          <h2>Sản phẩm</h2>
          <select className='w-full' value onChange>
            <option value='all'>All</option>
            {}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
