import React, { useState } from 'react';

export const Footer = () => {
  const [emailValue, setEmailValue] = useState('');

  // open email modal
  const openEmailModal = () => {
    const modalContainer = document.querySelector('.modal-container');
    modalContainer.classList.add('active');
    const trillModal = document.querySelector('.trill-modal');
    trillModal.classList.add('display');
    modalContainer.addEventListener('click', () => {
      document
        .querySelectorAll('.modal-container')
        .forEach((modalContainer) => {
          modalContainer.classList.remove('active');
        });
      trillModal.classList.remove('display');
    });
  };

  window.addEventListener('scroll', () => {
    const scrollMeasure = document.querySelector('html');
    if (scrollMeasure.scrollTop >= scrollMeasure.scrollHeight - 1000) {
      document.querySelector('.back-to-top').style.display = 'block';
      document.querySelector('.ext').style.display = 'none';
    } else {
      document.querySelector('.back-to-top').style.display = 'none';
      document.querySelector('.ext').style.display = 'block';
    }
  });

  const backToTop = () => {
    const scrollMeasure = document.querySelector('html');
    scrollMeasure.scrollTop = 0;
  };

  return (
    <div className='footer-container'>
      <div className='notif-btn ext' onClick={openEmailModal}>
        <i className='fas fa-bell'></i>
      </div>
      <div
        className='back-to-top notif-btn'
        style={{ display: 'none' }}
        onClick={backToTop}
      >
        <i className='fas fa-chevron-up'></i>
      </div>
      <div className='trill-modal'>
        <div className='email-modal'>
          <h2>Join Our Newsletter</h2>
          <p>
            Be The First To Know About New Releases/ Concerts From Your Favorite
            Artists:
          </p>
          <form>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='example@gmail.com'
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
            <input type='submit' name='submit' id='submit' />
            <p>Join 330,000 Others</p>
          </form>
        </div>
      </div>
      <div className='footer-overlay'>
        <div className='top-footer-container'>
          <div className='left-content'>
            <h3 className='footer-title'>Quick Links</h3>
            <ul>
              <li>
                <a href='/d'>Contact Us</a>
              </li>
              <li>
                <a href='/d'>About Us</a>
              </li>
              <li>
                <a href='/d'>Join Us</a>
              </li>
              <li>
                <a href='/d'>Support</a>
              </li>
              <li>
                <a href='/d'>Advertise with Us</a>
              </li>
              <li>
                <a href='/d'>Promote your Song</a>
              </li>
            </ul>
          </div>
          <div className='middle-content'>
            <h3 className='footer-title'>Join Our Newsletter</h3>
            <p>
              Be The First To Know About New Releases/ Concerts From Your
              Favorite Artists:
            </p>
            <form>
              <input
                type='email'
                name='email'
                id='sub-email'
                placeholder='example@gmail.com'
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                required
              />
              <input type='submit' name='submit' id='sub-submit' />
              <p>Join 330,000 Others</p>
            </form>
          </div>
          <div className='right-content'>
            <h3 className='footer-title'>Follow Us</h3>
            <br />
            <div className='social-list'>
              <a href='/s'>
                <i className='fab fa-facebook'></i>
              </a>
              <a href='/s'>
                <i className='fab fa-telegram'></i>
              </a>
              <a href='/s'>
                <i className='fab fa-whatsapp'></i>
              </a>
              <a href='/s'>
                <i className='fab fa-twitter'></i>
              </a>
              <a href='/s'>
                <i className='fab fa-github'></i>
              </a>
            </div>
          </div>
        </div>
        <div className='bottom-footer-container'>
          <p className='copyright'>&copy; 2020. TrillSound♬</p>
        </div>
      </div>
      <div className='modal-container'></div>
    </div>
  );
};
