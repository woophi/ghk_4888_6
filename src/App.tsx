import { BottomSheet } from '@alfalab/core-components/bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { PureCell } from '@alfalab/core-components/pure-cell';
import { Typography } from '@alfalab/core-components/typography';
import { useEffect, useState } from 'react';
import alfaOnly from './assets/alfa_only.png';
import rest_12 from './assets/rest_12.png';
import taxi_2 from './assets/taxi_2.png';
import toggle from './assets/toggle.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [showBs, setShowBs] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [selected, setSelected] = useState('На 1 месяц');

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const submit = () => {
    setLoading(true);

    // LS.setItem(LSKeys.ShowThx, true);
    setThx(true);
    setLoading(false);
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <img src={alfaOnly} width={158} height={33} className={appSt.img} />
        <Typography.Text style={{ marginBottom: '1rem' }} view="primary-medium">
          Перейдите на новый уровень
        </Typography.Text>

        <img src={toggle} width={132} height={85} className={appSt.img} />

        <div className={appSt.switcher}>
          <div
            className={appSt.switcherBtn({ selected: selected === 'На 1 месяц' })}
            onClick={() => setSelected('На 1 месяц')}
          >
            <Typography.Text view="primary-medium" weight="medium">
              На 1 месяц
            </Typography.Text>
          </div>
          <div className={appSt.switcherBtn({ selected: selected === 'На 1 год' })} onClick={() => setSelected('На 1 год')}>
            <Typography.Text view="primary-medium" weight="medium">
              На 1 год
            </Typography.Text>
          </div>
        </div>

        <Typography.Text view="primary-medium">
          <b>Сохраните 20%</b> с подпиской на год
        </Typography.Text>

        <div className={appSt.box}>
          <PureCell>
            <PureCell.Graphics verticalAlign="center">
              <img src={rest_12} width={56} height={56} alt="rubd" />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  12 визитов в бизнес-залы и рестораны в год
                </Typography.Text>
                <Typography.Text view="primary-small" color="secondary">
                  Не чаще 2 раз в месяц
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
          <PureCell>
            <PureCell.Graphics verticalAlign="center">
              <img src={taxi_2} width={56} height={56} alt="rubd" />
            </PureCell.Graphics>
            <PureCell.Content>
              <PureCell.Main>
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  2 поездки
                </Typography.Text>
                <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                  на такси в год
                </Typography.Text>
              </PureCell.Main>
            </PureCell.Content>
          </PureCell>
        </div>

        <Typography.Text
          view="primary-medium"
          tag="p"
          defaultMargins={false}
          style={{ margin: '1rem 0' }}
          onClick={() => setShowBs(true)}
        >
          Подробнее об условиях
        </Typography.Text>
      </div>
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile
          className={appSt.btn}
          loading={loading}
          block
          view="primary"
          size={72}
          onClick={submit}
          hint="Подключить"
        >
          {selected === 'На 1 месяц' ? (
            '5 000 ₽ в месяц'
          ) : (
            <>
              <s>60 000 ₽</s> <span style={{ color: '#FFD57B' }}>48 000 ₽ на год</span>
            </>
          )}
        </ButtonMobile>
      </div>

      <BottomSheet
        open={showBs}
        onClose={() => {
          setShowBs(false);
        }}
        contentClassName={appSt.btmContent}
        actionButton={
          <ButtonMobile block view="primary" onClick={() => setShowBs(false)}>
            Понятно
          </ButtonMobile>
        }
      >
        <div className={appSt.containerBottom}>
          <Typography.TitleResponsive tag="h2" view="large" weight="bold">
            Рестораны и бизнес-залы
          </Typography.TitleResponsive>
          <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
            Не более 20 000 ₽ в месяц.
          </Typography.Text>
          <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
            Максимальная стоимость одного визита не более 2500 ₽. Сумма свыше будет считаться как 2 визита и более.
          </Typography.Text>
          <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
            За один день (дата чека) можно компенсировать бизнес-зал ИЛИ ресторан в аэропорту.
          </Typography.Text>

          <Typography.TitleResponsive tag="h2" view="large" weight="bold">
            Такси
          </Typography.TitleResponsive>

          <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
            Максимальная стоимость поездки не более 2500 ₽. Сумма свыше будет считаться как 2 поездки.
          </Typography.Text>
        </div>
      </BottomSheet>
    </>
  );
};
