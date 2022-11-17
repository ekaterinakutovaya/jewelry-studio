import React from 'react';

const OrderForm = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>
                <div>
                    <label className="data-block__label" htmlFor="">
                        Название
                    </label>
                    <input
                        type="text"
                        className="mb-3 w-100"
                        value={orderName}
                        onChange={e => setOrderName(e.target.value)}
                        disabled={isEditMode ? false : true}
                    />
                    <label className="data-block__label" htmlFor="">
                        Заказчик
                    </label>
                    <input
                        type="text"
                        className="w-100"
                        value={customer}
                        onChange={e => setCustomer(e.target.value)}
                        disabled={isEditMode ? false : true}
                    />
                </div>
            </div>

            <div>
                <div className="mb-4 d-flex justify-content-around">
                    <div>
                        <label htmlFor="handover-date_input">Дата приема</label>
                        {isEditMode ? (
                            <input
                                className={styles.date}
                                type="date"
                                value={receiveDateInput || ""}
                                onChange={e => setReceiveDateInput(e.target.value)}
                            />
                        ) : (
                            <input
                                className={styles.date}
                                type="text"
                                value={receiveDateText || ""}
                                disabled
                            />
                        )}
                    </div>
                    <div>
                        <label htmlFor="handover-date_input">Дата отдачи</label>
                        {isEditMode ? (
                            <input
                                className={styles.date}
                                type="date"
                                value={handoverDateInput || ""}
                                onChange={e => setHandoverDateInput(e.target.value)}
                            />
                        ) : (
                            <input
                                className={styles.date}
                                type="text"
                                value={handoverDateText || ""}
                                disabled
                            />
                        )}
                    </div>
                </div>

                <div className="d-flex justify-content-around">
                    <div>
                        <label htmlFor="">Цена</label>
                        <input
                            className={styles.price}
                            type="text"
                            value={price1}
                            onChange={e => setPrice1(e.target.value)}
                            disabled={isEditMode ? false : true}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Цена</label>
                        <input
                            className={styles.price}
                            type="text"
                            value={price2}
                            onChange={e => setPrice2(e.target.value)}
                            disabled={isEditMode ? false : true}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Цена</label>
                        <input
                            className={styles.price}
                            type="text"
                            value={price3}
                            onChange={e => setPrice3(e.target.value)}
                            disabled={isEditMode ? false : true}
                        />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-start">
                {isEditMode ? (
                    <UrgencyCheckbox
                        urgencyIndex={urgencyIndex}
                        setUrgencyIndex={setUrgencyIndex}
                    />
                ) : (
                    <span className={styles.urgency}>
                        <label>{renderUrgency(urgencyIndex)}</label>
                    </span>
                )}
            </div>

            <div className="d-flex justify-content-around">
                <div>
                    <label htmlFor="order-category__select">Категория</label>
                    <CategorySelect
                        isDisabled={isEditMode ? false : true}
                        defaultValue={categories[catIndex]}
                        options={categories}
                        onChange={onCatSelectChange}
                    />
                </div>

                <div>
                    <label htmlFor="order-category__select">Состояние</label>
                    <StatusSelect
                        isDisabled={isEditMode ? false : true}
                        defaultValue={status[statIndex]}
                        value={statIndex}
                        options={status}
                        onChange={onStatSelectChange}
                    />
                </div>
            </div>

            <div>
                <Gallery
                    isEditMode={isEditMode}
                    imagesFromDB={orderImagesByID}
                    setImagesFromDB={setImagesFromDB}
                    imagesToUpload={imagesToUpload}
                    setImagesToUpload={setImagesToUpload}
                    imagesToDelete={imagesToDelete}
                    setImagesToDelete={setImagesToDelete}
                />
            </div>

            <div className={styles.otherInfo}>
                <div style={{ alignSelf: "start" }}>
                    <div className={styles.otherParams}>
                        <div>
                            <label htmlFor="">Цвет металла</label>
                            <input
                                type="text"
                                value={metallColor}
                                onChange={e => setMetallColor(e.target.value)}
                                disabled={isEditMode ? false : true}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Параметры уха</label>
                            <input
                                type="text"
                                value={earParams}
                                onChange={e => setEarParams(e.target.value)}
                                disabled={isEditMode ? false : true}
                            />
                        </div>
                        <div>
                            <label htmlFor="">Размер кольца</label>
                            <input
                                type="text"
                                value={ringSize}
                                onChange={e => setRingSize(e.target.value)}
                                disabled={isEditMode ? false : true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.inserts}>
                <div className={styles.comments}>
                    <label htmlFor="">Примечание</label>
                    <textarea
                        rows="8"
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                        disabled={isEditMode ? false : true}
                    >
                        {comments}
                    </textarea>
                </div>
            </div>

            <div>
                <FileList
                    title={"Rhino файлы"}
                    files={rhinoFilesFromDB}
                    setFilesToDelete={setRhinoFilesToDelete}
                    setFiles={setRhinoFilesToUpload}
                    isDisabled={isEditMode ? false : true}
                />
                <div style={{ marginTop: "50px" }}>
                    <FileList
                        title={"Файлы резки"}
                        files={cuttingFilesFromDB}
                        setFilesToDelete={setCuttingFilesToDelete}
                        setFiles={setCuttingFilesToUpload}
                        isDisabled={isEditMode ? false : true}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderForm;