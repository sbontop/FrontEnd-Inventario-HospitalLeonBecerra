import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonCard,
    IonToolbar,
    IonInfiniteScroll, IonInfiniteScrollContent,
    IonButton, IonLabel
} from '@ionic/react';
import React, {useState, useEffect} from 'react';

const InfinitiveScrollFiltered: React.FC = () => {

    const [items, setItems] = useState<string[]>([]);

    const [filter, setFilter] = useState<string | undefined>(undefined);

    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);

    async function fetchData(reset?: boolean) {
        const dogs: string[] = reset ? [] : items;
        const url: string = filter ? `https://dog.ceo/api/breed/${filter}/images/random/10` : 'https://dog.ceo/api/breeds/image/random/10';

        const res: Response = await fetch(url);
        res
            .json()
            .then(async (res) => {
                if (res && res.message && res.message.length > 0) {
                    setItems([...dogs, ...res.message]);
                    setDisableInfiniteScroll(res.message.length < 10);
                } else {
                    setDisableInfiniteScroll(true);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchData(true);
    }, [filter]);

    async function searchNext($event: CustomEvent<void>) {
        await fetchData(   );

        ($event.target as HTMLIonInfiniteScrollElement).complete();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab Two</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton onClick={() => setFilter('dachshund')}>
                    <IonLabel>Filter</IonLabel>
                </IonButton>

                {items.map((item: string, i: number) => {
                    return <IonCard key={`${i}`}><img src={item}/></IonCard>
                })}

                <IonInfiniteScroll threshold="100px" disabled={disableInfiniteScroll}
                                   onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
                    <IonInfiniteScrollContent
                        loadingText="Loading more good doggos...">
                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
};

export default InfinitiveScrollFiltered;