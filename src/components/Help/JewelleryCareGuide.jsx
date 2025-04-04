import { Typography } from "antd";
import { useEffect } from "react";

const JewelleryCareGuide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex flex-col  sm:pt-[110px] py-5 ">
        <div className="flex flex-col justify-center items-center  sm:px-20 px-5  ">
          <Typography.Text className="text-[30px] font-semibold">
            Jewelry care guide
          </Typography.Text>
        </div>
        <div className="sm:px-20 px-5 flex flex-col gap-5">
          <Typography.Text className="text-[16px] text-center">
            <span className="text-[18px] font-semibold">
              Treasured Adornments :-
            </span>
             A Guide to Preserving the Radiance of Your Silver Jewels As you
            adorn yourself with our exquisite silver creations, embellished with
            radiant CZ stones, vibrant color stones, and luxurious enameling,
            remember that each piece is a masterpiece deserving of tender care.
          </Typography.Text>
          <Typography.Text className="text-[16px] ">
            <span className="text-[18px] font-semibold">
              To Preserve the Luster-Handle with grace :-
            </span>
            Avoid exposing your jewels to harsh chemicals, abrasive materials,
            or extreme temperatures, lest they suffer damage or
            discoloration.-Store with elegance: Keep each piece separate,
            nestled in a soft pouch or box, to prevent scratching and tangling.
          </Typography.Text>
          <Typography.Text className="text-[16px] ">
            <span className="text-[18px] font-semibold">
              -Clean with finesse:-
            </span>
            Gently wipe silver with a soft cloth and mild soap solution, while
            CZ stones and color stones require a soft, dry cloth. Enameling
            demands gentle care, avoiding harsh chemicals or abrasive materials
          </Typography.Text>
          <Typography.Text className="text-[16px] ">
          <span className="text-[18px] font-semibold">
          To Maintain the Brilliance :-
            </span>
            -Avoid vigorous activities or slumber
            while adorned, as this may cause damage or scratches.-Shield your
            jewels from direct sunlight and moisture, which can cause fading or
            discoloration.-Store your treasures in a cool, dry place, away from
            perfumes and cosmetics
          </Typography.Text>
          <Typography.Text className="text-[16px] ">
          <span className="text-[18px] font-semibold">
          To Revitalize Your Jewels :-
            </span>
            To Revitalize Your Jewels"-Consult any professional jewelleryfor
            extensive cleaning or repair, ensuring your treasures receive the
            care they deserve.
          </Typography.Text>
          <Typography.Text className="text-[16px] ">
            By heeding these guidelines, your silver jewels will remain
            resplendent, their beauty and sparkle preserved for generations to
            come
          </Typography.Text>
          <Typography.Text className="text-[16px] text-center ">
            <strong>
            
              In case of any queries or concern please contact us at
              Zoci.india@gmail.com.
            </strong>
          </Typography.Text>
        </div>
      </div>
    </>
  );
};
export default JewelleryCareGuide;
